import threading
import GUI, main2

def run_eeg_recording():
    EEG_recording.main()

def run_gui():
    GUI.main()


if __name__ == '__main__':
    eeg_thread = threading.Thread(target=run_eeg_recording)
    gui_thread = threading.Thread(target=run_gui)

    eeg_thread.start()
    gui_thread.start()

    eeg_thread.join()
    gui_thread.join()
