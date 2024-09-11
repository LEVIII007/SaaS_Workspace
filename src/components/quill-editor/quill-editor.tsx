// using quill editor for realtime workspace
'use client';

import React, { useCallback } from 'react';
import { File, Folder, workspace } from '@/lib/supabase/supabase.types';
import { useAppState } from '@/lib/providers/state-provider';
import { set } from 'zod';

interface QuillEditorProps {
    dirDetails: File | Folder | workspace;
    fileId : string;
    dirType: string;
}

// router cache, it will create issue



export const QuillEditor: React.FC<QuillEditorProps> = ({dirDetails, fileId, dirType}) => {
    // render out our quill editor
    // socket.io to create connection between users
    // supabase presence, to show who is online

    const [quill , setquill] = React.useState();           // we will use this to store our quill instance, we need to make it client side
    const {state, worksapceId, folderId, dispatch} = useAppState();  // we will use this to get the current workspaceId and folderId

    const wrapperRef = useCallback(async (wrapper) => {
        if(wrapper == null) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const quill = (await import ("quill")).default;

        cosnt q = new quill(editor, {
            theme : "snow",
            modules: {
                toolbar: [
                    [{header: "1"}, {header: "2"}, {font: []}],
                    [{list: "ordered"}, {list: "bullet"}],
                    ["bold", "italic", "underline"],
                    [{color: []}, {background: []}],
                    [{script: "sub"}, {script: "super"}],
                    ["image", "blockquote", "code-block"],
                    ["clean"]
                ]
            }

        });
        setquill(q);

    }, []);

  return (
    <div id = "container" className = "max-w-[8000" ref = {wrapperRef}>
        </div> 

  )
}
