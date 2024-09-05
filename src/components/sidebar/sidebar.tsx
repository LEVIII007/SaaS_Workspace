import { create } from 'domain';
import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';
import { redirect } from 'next/dist/server/api-utils';
import { getFolder } from '@/lib/supabase/queries';

interface SidebarProps {
    params : {
        workspaceId : string
    };
    className? : string;
}

export const Sidebar: React.FC<SidebarProps> = async ({params, className}) => {
    const supabase = createServerComponentClient({ cookies });
    //FIRST CHECK IF THERE IS A USER
    // THEN CHECK SUBSCRIPTION STATUS
    // CHECK IF FOLDERS EXIST, WE WANT TO SHOW THE FOLDERS IN SIDEBAR
    //CHECK FOR ERRORS, IF YES THEN REDIRECT TO DASHBOARD
    // GET ALL THE DIFFERENT WORKSPACES (PRIVATE AND SHARED)
    // 

    const { data: { user } } = await supabase.auth.getUser();

    if(!user) return;

    const {data : subscriptionData, error : subscriptionError} = await getUserSubscriptionStatus(user.id);

    const {data : workspaceFolderData, erorr : folderError} = await getFolder(params.workspaceId);

    if(subscriptionError || folderError) return redirect('/dashboard');




  return (
    <div>sidebar</div>
  )
}

export default Sidebar
