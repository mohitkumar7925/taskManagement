import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { TodoItem } from '@src/store';

const TodoPath = 'tasks';

export const TodoService = {
  subscribe: (
    uid: string,
    callback: (err: Error | null, todos: TodoItem[]) => void
  ) =>
    firestore()
      .collection(TodoPath)
      .doc(uid)
      .onSnapshot(
        snapshot => {
          const source = snapshot.metadata.fromCache
            ? "Loading 'todos' from local cache"
            : "Loading 'todos' from server";

          const todos = snapshot.data()?.todos || [];
          callback(null, todos);
        },
        err => {
          console.log(err);
          callback(err, []);
        }
      ),

  handleChange: (uid: string, todos: TodoItem[]) =>
    firestore().collection(TodoPath).doc(uid).set({ todos: todos }),
};
