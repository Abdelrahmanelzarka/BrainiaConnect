import threading
import queue  # for communication between threads
import GUI, main2

# Main scripts
# def run_eeg_recording():
#     # Replace with the actual call to your EEG recording script
#     EEG_recording.main()

def run_gui():
    GUI.main()

def run_main2():
    main2.main()


if __name__ == '__main__':
    # Create and start threads
    # eeg_thread = threading.Thread(target=run_eeg_recording)
    gui_thread = threading.Thread(target=run_gui)
    # main2_thread = threading.Thread(target=run_main2)

    # eeg_thread.start()
    gui_thread.start()
    # main2_thread.start()

    # Wait for both threads to finish (optional)
    # eeg_thread.join()
    gui_thread.join()
    # main2_thread.join()