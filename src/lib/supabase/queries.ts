'use server';
import db from './db';
import { subscriptions } from './schema';
import { Subscription } from './supabase.types';

export const getUserSubscriptionStatus = async (userId: string) => {
    try{
    const data = await db.query.subscriptions.findFirst({
        where: (s, { eq }) => eq(s.userId, userId),
    });
    if(data) {
        return { data: data as Subscription, error: null };
    }
} catch (error) {
    console.log('Error getting user subscription status', error);
    return { data : null , error : error };
    }
};


