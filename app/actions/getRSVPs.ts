'use server'

import { createClient } from "../utils/supabase/server";

export async function getRSVPs() {
    const supabase = await createClient();

    const { data, error } = await supabase.from("rsvps").select("*");

    if (error) {
        console.error("error fetching rsvps", error)
        return { success: false, message: "failed to fetch data" }
    }

    return {success : true, data}

}