'use client'; 
import {User} from '@/lib/supabase/supabase.types';
import React, { use, useState } from 'react'


export const WorkspaceCreator = () => {
    const [permissions, setPermission] = useState();
    const [workspace, setWorkspace] = useState('private');
    const [workspaceName, setWorkspaceName] = useState('');
    const [collaborators, setCollaborators] = useState<User[]>([]);
    const addCollaborator = (user : User) => {
        setCollaborators([...collaborators, user]);
    };

    const removeCollaborator = (user : User) => {
        setCollaborators(collaborators.filter((collaborator) => collaborator !== user));
    };


  return (
    <div>WorkspaceCreator</div>
  )


}
