import React, { use } from 'react'
import { User } from '@/lib/supabase/supabase.types';
import { useSupabaseUser } from '@/lib/providers/supabase-user-provider';
import { useEffect } from 'react';

interface CollaboratorSearchProps {
    existingCollaborators: User[]  | [];
    getCollaborator : (collaborators: User) => void;
    children : React.ReactNode;
};




const CollaboratorSearch: React.FC<CollaboratorSearchProps> = ({existingCollaborators, getCollaborator, children}) => {
    const user = useSupabaseUser();
    const [search, setSearch] = React.useState<User[] | []>([]);
    const timeRef = React.useRef<ReturnType<typeof setTimeout>>();


    useEffect(() => {
        if (search.length > 0) {
            timeRef.current = setTimeout(() => {
                setSearch([]);
            }, 3000);
        }
        return () => {
            clearTimeout(timeRef.current);
        };
    }, [search]);
            
  return (
    <div>CollaboratorSearch
    </div>
  )
}

export default CollaboratorSearch