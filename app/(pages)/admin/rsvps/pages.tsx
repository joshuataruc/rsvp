import { getRSVPs } from "@/app/actions/getRSVPs";
import Link from "next/link";
import { Button } from "@/components/ui/button"
import { House } from "lucide-react";

export default async function RSVPsPage() {
    const { success, data, message } = await getRSVPs();


    return (
        <div className="container mx-auto mt-8 p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">All RSVPs</h1>
                <div className="flex items-center gap-2">
                    <Link href={"/"}>
                        <Button variant={"outline"}>
                            <House />
                        </Button>
                    </Link>
                    <Button variant={"outline"}>
                        Sign Out
                    </Button>
                </div>

            </div>
        </div>
    )
}