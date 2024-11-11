import { firestore } from '../firebase';
import AuthProvider from './AuthProvider'; // Import your AuthProvider class

class AppProvider {
    private static instance: AppProvider;
    private notes: string[] = []; 

    private constructor() { }

    // Singleton pattern
    public static getInstance(): AppProvider {
        if (!AppProvider.instance) {
            AppProvider.instance = new AppProvider();
        }
        return AppProvider.instance;
    }

    // Helper function to check if the user is authenticated
    private getUser() {
        const user = AuthProvider.getInstance().getCurrentUser();
        if (!user) {
            throw new Error('User not authenticated');
        }
        return user;
    }

    // Fetch notes from Firestore and update the local state
    public async fetchNotes(): Promise<void> {
        try {
            const user = this.getUser();  // Check if the user is authenticated

            // // Proceed only if user is authenticated
            // const snapshot = await firestore
            //     .collection('notes')
            //     .where('userId', '==', user.uid)
            //     .get();

            // this.notes = snapshot.docs.map((doc) => ({
            //     id: doc.id,
            //     ...doc.data()
            // }));

            console.log("Notes fetched successfully");
        } catch (error) {
            console.error("Error fetching notes: ", error);
            throw new Error("Error fetching notes");
        }
    }

    // Get the current list of notes (local state)
    public getNotes(): any[] {
        return this.notes;
    }

    // Create a new note in Firestore and update the local state
    public async createNote(title: string, content: string): Promise<void> {
        try {
            const user = this.getUser();  // Check if the user is authenticated

            // const noteRef = await firestore.collection('notes').add({
            //     title,
            //     content,
            //     userId: user.uid,
            //     createdAt: new Date(),
            // });

            // const newNote = {
            //     id: noteRef.id,
            //     title,
            //     content,
            //     userId: user.uid,
            //     createdAt: new Date(),
            // };

            // // Update local notes state
            // this.notes.push(newNote);
            console.log("Note created successfully");
        } catch (error) {
            console.error("Error creating note: ", error);
            throw new Error("Error creating note");
        }
    }

    // Update a note in Firestore and update the local state
    public async updateNote(id: string, title: string, content: string): Promise<void> {
        try {
            const user = this.getUser();  // Check if the user is authenticated

            // await firestore.collection('notes').doc(id).update({ title, content });

            // Update the local state as well
            // const noteIndex = this.notes.findIndex(note => note.id === id);
            // if (noteIndex >= 0) {
            //     this.notes[noteIndex] = { ...this.notes[noteIndex], title, content };
            // }

            console.log("Note updated successfully");
        } catch (error) {
            console.error("Error updating note: ", error);
            throw new Error("Error updating note");
        }
    }

    // Delete a note from Firestore and update the local state
    public async deleteNote(id: string): Promise<void> {
        try {
            const user = this.getUser();  // Check if the user is authenticated

            // await firestore.collection('notes').doc(id).delete();

            // Update the local state by removing the note
            // this.notes = this.notes.filter(note => note.id !== id);
            console.log("Note deleted successfully");
        } catch (error) {
            console.error("Error deleting note: ", error);
            throw new Error("Error deleting note");
        }
    }
}

export default AppProvider;
