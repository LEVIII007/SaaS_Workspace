import React from 'react'
import CustomDialogTrigger from '../global/custom-dialog-trigger';

interface settingsprops {
    children : React.ReactNode;
}

export const Settings : React.FC<settingsprops> = ({children} : settingsprops) => {
    return <CustomDialogTrigger header = "Settings" content = {<></>}> 
    {children}
    </CustomDialogTrigger>;
}


