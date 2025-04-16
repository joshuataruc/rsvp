'use client'
import React from 'react'
import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { Toaster } from '@/components/ui/sonner'
import { Toaster, toast } from "sonner"
import { Input } from '@/components/ui/input'
import { strings } from '../utils/strings'
import { submitRSVP } from '../actions/submitRSVPS'


const RSVPForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [accompany, setAccompany] = useState<string | null>(null)
    const [attendance, setAttendance] = useState("yes");
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setisLoading] = useState(false);
    // const [sonner, setName] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name) {
            setErrors({ name: "Name is required" })
            return
        }
        if (!email) {
            setErrors({ email: "Email is required" })
            return
        }

        const formData = new FormData();
        formData.append('name', name)
        formData.append('email', email)
        formData.append('accompany', accompany || "0")
        formData.append('attendance', attendance)
        // console.log(formData, 'formdata')

        setisLoading(true)
        const response = await submitRSVP(formData)

        if (response.success) {
            toast.success("Success", {
                description: strings.thankYouMessage,
                action : {
                    label : "Remove",
                    onClick: () => console.log("Undo"),
                }
            });
            setName("")
            setEmail("")
            setAccompany("")
            setAttendance("")
        }
        else{
            toast("Error", {
                description: response.message,
            });
        }
        setisLoading(false)

    }

    const openGoogleMaps = () => {
        const encodedLocation = encodeURIComponent(strings.eventLocation)
        window.open(`https://www.google.com/maps/search/?api=1&query=${encodedLocation}`, "_blank")
    }

    return (
        <div className='max-w-md mx-auto my-10'>
            <h1 className='text-2xl font-bold mb-4'>{strings.title}</h1>
            <p className='mb-6'>{strings.description}</p>

            <div className='mb-6'>
                <Label>{strings.eventDateLabel}</Label>
                {/* <p>{strings.eventDate}</p> */}
                <Calendar
                    mode="single"
                    selected={new Date(strings.eventDate)}
                    className='rounded-md border flex flex-col items-center mt-3'
                    fromDate={new Date(strings.eventDate)}
                    toDate={new Date(strings.eventDate)}
                    defaultMonth={new Date(strings.eventDate)}
                    ISOWeek
                >

                </Calendar>
                <div className='mt-4'>
                    <Button className='w-full' variant={'outline'} onClick={openGoogleMaps}>
                        <MapPin />
                        {strings.viewOnMapButton}
                    </Button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                    <Label htmlFor="Name">{strings.nameLabel}</Label>
                    <Input
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    {errors.name && (
                        <p className='text-red-500, text-sm mt-1'>{errors.name}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="email">{strings.emailLabel}</Label>
                    <Input
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors.email && (
                        <p className='text-red-500, text-sm mt-1'>{errors.email}</p>
                    )}
                </div>
                <div>
                    <Label htmlFor="accompany">{strings.accompanyLabel}</Label>
                    <Input
                        id='accompany'
                        type='number'
                        min="0"
                        value={accompany || ""}
                        onChange={(e) => setAccompany(e.target.value)}
                    />
                </div>
                <div>
                    <Label>{strings.rsvpLabel}</Label>
                    <RadioGroup value={attendance} onValueChange={setAttendance} >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="yes" />
                            <Label htmlFor="yes">{strings.yesOption}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="no" />
                            <Label htmlFor="no">{strings.noOption}</Label>
                        </div>
                    </RadioGroup>
                </div>
                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Sending" : strings.submitButton}
                </Button>
                
            </form>
        </div>

    )
}

export default RSVPForm