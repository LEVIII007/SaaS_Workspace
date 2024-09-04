'use server';

import { z } from 'zod';

import { FormSchema } from '@/lib/types';
import {cookies} from next/headers;
import {createRouteHandlerClient} from '@supabase/auth-helpers-nextjs';



export async function actionLoginUser({
    email,
    password,
}: z.infer<typeof FormSchema>) {
    const supabase = createRouteHandlerClient();
    const response = await supabase.auth.signIn({
})