import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Message, ChatRoom, Task } from '../types/chat';

interface AppState {
  // Chat state
  chatRooms: ChatRoom[];
  activeChatRoom: string | null;
  messages: Record<string, Message[]>;
  
  // Task state
  tasks: Task[];
  pendingTasks: Task[];
  completedTasks: Task[];
  
  // UI state
  isDarkMode: boolean;
  sidebarOpen: boolean;
  fontSize: number;
  language: string;
  
  // Actions
  setActiveChatRoom: (roomId: string) => void;
  addMessage: (roomId: string, message: Message) => void;
  markMessageAsRead: (roomId: string, messageId: string) => void;
  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, updatedTask: Partial<Task>) => void;
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setFontSize: (size: number) => void;
  setLanguage: (lang: string) => void;
}

export const useStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        // Initial state
        chatRooms: [],
        activeChatRoom: null,
        messages: {},
        tasks: [],
        pendingTasks: [],
        completedTasks: [],
        isDarkMode: false,
        sidebarOpen: true,
        fontSize: 16,
        language: 'en',

        // Actions
        setActiveChatRoom: (roomId) =>
          set({ activeChatRoom: roomId }),

        addMessage: (roomId, message) =>
          set((state) => ({
            messages: {
              ...state.messages,
              [roomId]: [...(state.messages[roomId] || []), message],
            },
          })),

        markMessageAsRead: (roomId, messageId) =>
          set((state) => ({
            messages: {
              ...state.messages,
              [roomId]: state.messages[roomId].map((msg) =>
                msg.id === messageId ? { ...msg, isRead: true } : msg
              ),
            },
          })),

        addTask: (task) =>
          set((state) => ({
            tasks: [...state.tasks, task],
            pendingTasks: [...state.pendingTasks, task],
          })),

        updateTaskStatus: (taskId, status) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === taskId);
            if (!task) return state;

            const updatedTask = { ...task, status };
            const updatedTasks = state.tasks.map((t) =>
              t.id === taskId ? updatedTask : t
            );

            return {
              tasks: updatedTasks,
              pendingTasks: status === 'completed' 
                ? state.pendingTasks.filter((t) => t.id !== taskId)
                : state.pendingTasks.map((t) => t.id === taskId ? updatedTask : t),
              completedTasks: status === 'completed'
                ? [...state.completedTasks, updatedTask]
                : state.completedTasks.filter((t) => t.id !== taskId),
            };
          }),

        deleteTask: (taskId) =>
          set((state) => ({
            tasks: state.tasks.filter((t) => t.id !== taskId),
            pendingTasks: state.pendingTasks.filter((t) => t.id !== taskId),
            completedTasks: state.completedTasks.filter((t) => t.id !== taskId),
          })),

        editTask: (taskId, updatedTask) =>
          set((state) => {
            const task = state.tasks.find((t) => t.id === taskId);
            if (!task) return state;

            const newTask = { ...task, ...updatedTask };
            const updatedTasks = state.tasks.map((t) =>
              t.id === taskId ? newTask : t
            );

            return {
              tasks: updatedTasks,
              pendingTasks: state.pendingTasks.map((t) =>
                t.id === taskId ? newTask : t
              ),
              completedTasks: state.completedTasks.map((t) =>
                t.id === taskId ? newTask : t
              ),
            };
          }),

        toggleDarkMode: () =>
          set((state) => ({ isDarkMode: !state.isDarkMode })),

        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen })),

        setFontSize: (size) =>
          set({ fontSize: size }),

        setLanguage: (lang) =>
          set({ language: lang }),
      }),
      {
        name: 'process-planning-storage',
      }
    )
  )
); 