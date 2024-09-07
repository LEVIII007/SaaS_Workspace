'use client';

import React, {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import { File, Folder, Workspaces } from '../supabase/supabase.types';
import { usePathname } from 'next/navigation';
import { getFiles } from '../supabase/queries';

export type appFoldersType = Folder & { files: File[] | [] };
export type appWorkspacesType = Workspaces & {                 // workspace have files, folders
  folders: appFoldersType[] | [];
};

interface AppState {
  workspaces: appWorkspacesType[] | [];                        // an AppState interface that defines the shape of the state object that will be managed by the appReducer function.
}

type Action =                                             // The Action type is a TypeScript union type that defines the possible actions that can be dispatched in a state management context,
  | { type: 'ADD_WORKSPACE'; payload: appWorkspacesType }
  | { type: 'DELETE_WORKSPACE'; payload: string }
  | {
      type: 'UPDATE_WORKSPACE';
      payload: { Workspaces: Partial<appWorkspacesType>; workspaceId: string };
    }
  | {
      type: 'SET_WORKSPACES';
      payload: { workspaces: appWorkspacesType[] | [] };
    }
  | {
      type: 'SET_FOLDERS';
      payload: { workspaceId: string; folders: [] | appFoldersType[] };
    }
  | {
      type: 'ADD_FOLDER';
      payload: { workspaceId: string; folder: appFoldersType };
    }
  | {
      type: 'ADD_FILE';
      payload: { workspaceId: string; file: File; folderId: string };
    }
  | {
      type: 'DELETE_FILE';
      payload: { workspaceId: string; folderId: string; fileId: string };
    }
  | {
      type: 'DELETE_FOLDER';
      payload: { workspaceId: string; folderId: string };
    }
  | {
      type: 'SET_FILES';
      payload: { workspaceId: string; files: File[]; folderId: string };
    }
  | {
      type: 'UPDATE_FOLDER';
      payload: {
        folder: Partial<appFoldersType>;
        workspaceId: string;
        folderId: string;
      };
    }
  | {
      type: 'UPDATE_FILE';
      payload: {
        file: Partial<File>;
        folderId: string;
        workspaceId: string;
        fileId: string;
      };
    };

const initialState: AppState = { workspaces: [] };

const appReducer = (                    // appReducer function that takes the current state and an action and returns a new state based on the action type.
  state: AppState = initialState,
  action: Action
): AppState => {
  switch (action.type) {
    case 'ADD_WORKSPACE':
      return {
        ...state,
        workspaces: [...state.workspaces, action.payload],
      };
    case 'DELETE_WORKSPACE':
      return {
        ...state,
        workspaces: state.workspaces.filter(
          (Workspaces) => Workspaces.id !== action.payload
        ),
      };
    case 'UPDATE_WORKSPACE':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          if (Workspaces.id === action.payload.workspaceId) {
            return {
              ...Workspaces,
              ...action.payload.Workspaces,
            };
          }
          return Workspaces;
        }),
      };
    case 'SET_WORKSPACES':
      return {
        ...state,
        workspaces: action.payload.workspaces,
      };
    case 'SET_FOLDERS':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          if (Workspaces.id === action.payload.workspaceId) {
            return {
              ...Workspaces,
              folders: action.payload.folders.sort(
                (a, b) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime()
              ),
            };
          }
          return Workspaces;
        }),
      };
    case 'ADD_FOLDER':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          return {
            ...Workspaces,
            folders: [...Workspaces.folders, action.payload.folder].sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
            ),
          };
        }),
      };
    case 'UPDATE_FOLDER':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          if (Workspaces.id === action.payload.workspaceId) {
            return {
              ...Workspaces,
              folders: Workspaces.folders.map((folder) => {
                if (folder.id === action.payload.folderId) {
                  return { ...folder, ...action.payload.folder };
                }
                return folder;
              }),
            };
          }
          return Workspaces;
        }),
      };
    case 'DELETE_FOLDER':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          if (Workspaces.id === action.payload.workspaceId) {
            return {
              ...Workspaces,
              folders: Workspaces.folders.filter(
                (folder) => folder.id !== action.payload.folderId
              ),
            };
          }
          return Workspaces;
        }),
      };
    case 'SET_FILES':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          if (Workspaces.id === action.payload.workspaceId) {
            return {
              ...Workspaces,
              folders: Workspaces.folders.map((folder) => {
                if (folder.id === action.payload.folderId) {
                  return {
                    ...folder,
                    files: action.payload.files,
                  };
                }
                return folder;
              }),
            };
          }
          return Workspaces;
        }),
      };
    case 'ADD_FILE':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          if (Workspaces.id === action.payload.workspaceId) {
            return {
              ...Workspaces,
              folders: Workspaces.folders.map((folder) => {
                if (folder.id === action.payload.folderId) {
                  return {
                    ...folder,
                    files: [...folder.files, action.payload.file].sort(
                      (a, b) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                    ),
                  };
                }
                return folder;
              }),
            };
          }
          return Workspaces;
        }),
      };
    case 'DELETE_FILE':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          if (Workspaces.id === action.payload.workspaceId) {
            return {
              ...Workspaces,
              folder: Workspaces.folders.map((folder) => {
                if (folder.id === action.payload.folderId) {
                  return {
                    ...folder,
                    files: folder.files.filter(
                      (file) => file.id !== action.payload.fileId
                    ),
                  };
                }
                return folder;
              }),
            };
          }
          return Workspaces;
        }),
      };
    case 'UPDATE_FILE':
      return {
        ...state,
        workspaces: state.workspaces.map((Workspaces) => {
          if (Workspaces.id === action.payload.workspaceId) {
            return {
              ...Workspaces,
              folders: Workspaces.folders.map((folder) => {
                if (folder.id === action.payload.folderId) {
                  return {
                    ...folder,
                    files: folder.files.map((file) => {
                      if (file.id === action.payload.fileId) {
                        return {
                          ...file,
                          ...action.payload.file,
                        };
                      }
                      return file;
                    }),
                  };
                }
                return folder;
              }),
            };
          }
          return Workspaces;
        }),
      };
    default:
      return initialState;
  }
};

const AppStateContext = createContext<     // what is it doing?  
  | {
      state: AppState;
      dispatch: Dispatch<Action>;
      workspaceId: string | undefined;
      folderId: string | undefined;
      fileId: string | undefined;
    }
  | undefined
>(undefined);

interface AppStateProviderProps {
  children: React.ReactNode;
}

const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);                    // useReducer hook to create a state management context that will manage the state of the application.
  const pathname = usePathname();

  const workspaceId = useMemo(() => {                            // to get the workspaceId from the URL
    const urlSegments = pathname?.split('/').filter(Boolean);
    if (urlSegments)
      if (urlSegments.length > 1) {
        return urlSegments[1];
      }
  }, [pathname]);

  const folderId = useMemo(() => {                        // to get the folderId from the URL
    const urlSegments = pathname?.split('/').filter(Boolean);
    if (urlSegments)
      if (urlSegments?.length > 2) {
        return urlSegments[2];
      }
  }, [pathname]);

  const fileId = useMemo(() => {                                  // to get the fileId from the URL
    const urlSegments = pathname?.split('/').filter(Boolean);
    if (urlSegments)
      if (urlSegments?.length > 3) {
        return urlSegments[3];
      }
  }, [pathname]);

  useEffect(() => {
    if (!folderId || !workspaceId) return;
    const fetchFiles = async () => {
      const { error: filesError, data } = await getFiles(folderId);
      if (filesError) {
        console.log(filesError);
      }
      if (!data) return;
      dispatch({
        type: 'SET_FILES',
        payload: { workspaceId, files: data, folderId },
      });
    };
    fetchFiles();
  }, [folderId, workspaceId]);

  useEffect(() => {
    console.log('App State Changed', state);
  }, [state]);

  return (
    <AppStateContext.Provider
      value={{ state, dispatch, workspaceId, folderId, fileId }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
};