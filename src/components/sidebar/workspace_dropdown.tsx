import React, { useEffect } from 'react'
import { Workspaces } from '@/lib/supabase/supabase.types';

interface Props {
      privateWorkspaces: Workspaces[] | [];
      sharedWorkspaces: Workspaces[] | [];
        collaboratingWorkspaces: Workspaces[] | [];
        defaultValue: Workspaces[] | undefined;
    }

export const workspaceDropdown : React.FC<Props>  = ({
    privateWorkspaces,
    sharedWorkspaces,
    collaboratingWorkspaces,
    defaultValue,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState(defaultValue);
    cosnt {dispatch, state} = useAppState();



    useEffect(() => {
        if(!state.wordspaces.length){
            
        }



  return (
    <div>workspace</div>
  )
}
