import mne
from pylsl import StreamInlet, resolve_stream
import pandas as pd
import numpy as np
import pyedflib

def main():
    # Initialize the streaming layer
    print("Looking for an EEG stream...")
    streams = resolve_stream()
    inlet = StreamInlet(streams[0])
    print("Stream found!")

    # Initialize the colomns of your data and your dictionary to capture the data.
    columns = ['Time', 'FZ', 'C3', 'CZ', 'C4', 'PZ', 'PO7', 'OZ', 'PO8', 'AccX', 'AccY', 'AccZ',
               'Gyro1', 'Gyro2', 'Gyro3', 'Battery', 'Counter', 'Validation', 'Triggers']
    s_freq = 250  # Sampling rate (Hz)
    channel_names = ['FZ', 'C3', 'CZ', 'C4', 'PZ', 'PO7', 'OZ', 'PO8']  # List of channel names
    # data_dict = dict((k, []) for k in columns)

    data_only, all_data, all_triggers = [], [], []
    epochs = 10
    trig = 1

    # Start recording
    while trig < s_freq * 40:
        # data is collected at 250 Hz. Let's stop data collection after 60 seconds.
        # Meaning we stop when we collect 250*60 samples.
        temp_time, triggers = [], []
        while len(temp_time) < 50:
            # Get the streamed data. Columns of sample are equal to the columns variable,
            # only the first element being timestamp concatenate timestamp and data in 1 list
            data, timestamp = inlet.pull_sample()
            all_data.append(timestamp + data)
            temp_time.append(timestamp)
            data_only.append(data)
            # updating data dictionary with newly transmitted samples
            # for key in list(data.keys()):
            #     data_dict[key].append(all_data[i])
            #     i += 1
        triggers.extend(0 for x in range(s_freq * 60))
        triggers[0] = trig
        all_triggers.append(triggers)
        trig += 1

    # Combine all data chunks
    data = np.concatenate(data_only, axis=0)
    # Create an Info object with sampling rate and channel information
    info = mne.create_info(ch_names=channel_names, sfreq=s_freq, ch_types='eeg')
    # Create a Raw object containing the data and info
    raw = mne.io.RawArray(data, info)
    # Additional information for XDF (optional)
    events = [] # Can define events using mne.Annotations or mne.Epochs functions
    # Save the data in EDF or XDF format (replace with your preferred format)
    raw.save('my_eeg_recording.xdf', events=events, overwrite=True)
    print("EEG recording saved in XDF format!")

    with pyedflib.EdfWriter("my_data.edf", info['sfreq'], n_channels=int(8), file_type='') as f:
        f.set_labels(info['ch_names'])
        for channel in data:
            f.write_digital_samples(channel)

    # Lastly, save our data and triggers to a CSV format.
    # data_df = pd.DataFrame.from_dict(data_dict)
    data_df = pd.DataFrame(all_data)
    data_df['Triggers'] = all_triggers
    data_df.columns = columns
    data_df.to_csv('EEGdata.csv', index=False)
    print("EEG recording saved in CSV format!")

if __name__ == '__main__':
    main()