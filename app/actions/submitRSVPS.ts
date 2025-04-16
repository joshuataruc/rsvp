'use server'

import { createClient } from "../utils/supabase/server";

export async function submitRSVP(formData: FormData) {
    const supabase = await createClient();

    const name = formData.get("name");
    const email = formData.get("email");
    const accompany = formData.get("accompany");
    const attendance = formData.get("attendance");

    const { data, error } = await supabase
    .from("rsvps")
    .insert([{
        name,
        email,
        accompany,
        attendance
    }])
    console.log(data, 'dataSubmitRSVP')

    if(error){
        console.error('Error inserting RSVP', error)
        return {success : false, message: "failed to submit rsvp", error}
    }

    return {success : true, message: "rsvp sent successfully"}
}