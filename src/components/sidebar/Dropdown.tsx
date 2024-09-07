'use client';
import { useAppState } from '@/lib/providers/state-provider';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion';
import clsx from 'clsx';
import EmojiPicker from '../global/emoji-picker';
import { createFile, updateFile, updateFolder } from '@/lib/supabase/queries';
import { useToast } from '@/hooks/use-toast';
import TooltipComponent from '../global/tooltip-component';
import { PlusIcon, Trash } from 'lucide-react';
import { File } from '@/lib/supabase/supabase.types';
import { v4 } from 'uuid';
import { useSupabaseUser } from '@/lib/providers/supabase-user-provider';
import { workspace } from '@/lib/supabase/schema';

interface DropdownProps {
    title : string;
    id : string;
    listType : 'folder' | 'file';
    iconId : String;
    children? : React.ReactNode;
    disabled? : boolean;
    customIcom? : React.ReactNode;
}


export const Dropdown : React.FC<DropdownProps> = ({title, id, listType, iconId, children, disabled, customIcom}) => {
    const supabase  = createClientComponentClient();
    const { user } = useSupabaseUser();
    const { dispatch, state, workspaceId, folderId } = useAppState();
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();
    const { toast } = useToast();
    //folder title synced with server data and local data
    // file title
    // navigate the user to different page
    // add a file
    // add a folder
    // double click handler
    // blur 
    // on changes
    // emoji changes
    // move to trash


 //folder Title synced with server data and local
  const folderTitle: string | undefined = useMemo(() => {
    if (listType === 'folder') {
      const stateTitle = state.workspaces
        .find((workspace) => workspace.id === workspaceId)
        ?.folders.find((folder) => folder.id === id)?.title;
      if (title === stateTitle || !stateTitle) return title;
      return stateTitle;
    }
  }, [state, listType, workspaceId, id, title]);

    //file title

    

    return (
        <div>
            <div>
                {customIcom}
                <p>{title}</p>
            </div>
            {children}
        </div>
    )
}
