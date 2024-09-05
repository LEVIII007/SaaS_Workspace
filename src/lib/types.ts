import {z} from 'zod';

export const FormSchema = z.object({
    email : z.string().describe('Email').email({message : 'invalid email'}),
    password : z.string().describe('password').min(6)
});


export const CreateWorkspaceFormSchema = z.object({
    logo : z.any(),
    workspaceName : z.string().min(1, "workspace name must be atleast 1 character").describe('Workspace Name')
});

