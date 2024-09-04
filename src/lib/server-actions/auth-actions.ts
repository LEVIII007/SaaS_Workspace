'use server';

import { z } from 'zod';
import { FormSchema } from '@/lib/types';
import {cookies} from 'next/headers';
import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';



export async function actionLoginUser({
    email,
    password,
}: z.infer<typeof FormSchema>) {
    const supabase = createRouteHandlerClient({cookies});
    const response = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return response;
}


export async function actionSignUpUser({
    email,
    password,
}: z.infer<typeof FormSchema>) {
    const supabase = createRouteHandlerClient({cookies});
    const { data } = await supabase     
    .from('profiles')
    .select('*')
    .eq('email', email);


    if(data?.length) return {error : {
        message : 'User already exist with this email',
        data
    }}

    const response = await supabase.auth.signUp({
        email, password,
        options : {
            emailRedirectTo : `${process.env.NEXT_PUBLIC_URL}api/auth/callback`,
        }
    });
    return response;

}



// we could use db to make queries using drizzle, but i wanted to learn how to query using supabase.

