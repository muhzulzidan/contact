import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function ContactPage() {
    const router = useRouter()
    const { id } = router.query

    const [contact, setContact] = useState(null)

    useEffect(() => {
        if (id) {
            fetch(`/api/contact/${id}`)
                .then(response => response.json())
                .then(data => setContact(data))
        }
    }, [id])
console.log(contact, 'contact')
    if (!contact) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>{contact.data.firstName} {contact.data.lastName}</h1>
            <p>Age: {contact.age}</p>
            <img src={contact.photo} alt={`${contact.firstName} ${contact.lastName}`} />
        </div>
    )
}