import scipy.io
import numpy as np
import matplotlib.pyplot as plt
from mne.time_frequency import psd_array_multitaper
from scipy.signal import spectrogram
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
from sklearn.metrics import accuracy_score


eeg_data = scipy.io.loadmat('/content/drive/MyDrive/Copy of OUR_AllData.mat')['OUR_AllData']  # replace 'EEG_data_key' with the actual key
labels = scipy.io.loadmat('/content/drive/MyDrive/Copy of OUR_y_AllData.mat')['OUR_y_AllData']  # replace 'labels_key' with the actual key

# Confirm the shapes
print(f'EEG data shape: {eeg_data.shape}')  # should be (n_channels, n_datapoints, n_subbands, n_char, n_blocks, n_trials)
print(f'Labels shape: {labels.shape}')  # should be (1, 40, 2, 16)


fs = 250  # Sampling frequency

def generate_spectrogram(eeg_segment):
    f, t, Sxx = spectrogram(eeg_segment, fs)
    return f, t, Sxx

# Generate spectrograms for all trials and channels
spectrograms = []
y = []
for trial in range(eeg_data.shape[-1]):
    for block in range(eeg_data.shape[-2]):
        for char in range(eeg_data.shape[-3]):
            for subband in range(eeg_data.shape[-4]):
                for channel in range(eeg_data.shape[0]):
                    eeg_segment = eeg_data[channel, :, subband, char, block, trial].flatten()
                    f, t, Sxx = generate_spectrogram(eeg_segment)
                    spectrograms.append(10 * np.log10(Sxx))
                    y.append(labels[0, char, block, trial])

spectrograms = np.array(spectrograms)


n_samples = spectrograms.shape[0]
n_features = spectrograms.shape[1] * spectrograms.shape[2]
X = spectrograms.reshape(n_samples, n_features)

# Convert y to a numpy array
y = np.array(y).flatten()

# Ensure that the number of samples in X and y are the same
assert X.shape[0] == y.shape[0], f"Mismatch in number of samples: X has {X.shape[0]} and y has {y.shape[0]}"


# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a Support Vector Machine (SVM) classifier
clf = SVC(kernel='linear')
clf.fit(X_train, y_train)

# Predict and evaluate the model
y_pred = clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f'Classification Accuracy: {accuracy * 100:.2f}%')

y_pred = clf.predict(X_test)