import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Layout from '@/components/layout'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'
import Link from 'next/link'

async function fetchContacts() {
  const response = await fetch('https://contact.herokuapp.com/contact')
  const contacts = await response.json()
  return contacts
}
async function fetchContactsPerId(id: string) {
  const response = await fetch(`https://contact.herokuapp.com/contact/${id} `)
  const contacts = await response.json()
  return contacts
}

export const getServerSideProps: GetServerSideProps = async () => {
  const contacts = await fetchContacts()

  return {
    props: {
      contacts,
    },
  }
}



export default function Home({ contacts }: HomeProps) {
  console.log(contacts, 'contacts')
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [photo, setPhoto] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updatedContacts, setUpdatedContacts] = useState(contacts)
  const [editingContact, setEditingContact] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [dialogOpenEdit, setDialogOpenEdit] = useState(false);

  const [editFirstName, setEditFirstName] = useState(editingContact?.data?.firstName ?? '');
  const [editLastName, setEditLastName] = useState(editingContact?.data?.lastName ?? '');
  const [editAge, setEditAge] = useState(editingContact?.data?.age ?? '');
  const [editPhoto, setEditPhoto] = useState(editingContact?.data?.photo ?? '');

  useEffect(() => {
    setEditFirstName(editingContact?.data?.firstName ?? '');
    setEditLastName(editingContact?.data?.lastName ?? '');
    setEditAge(editingContact?.data?.age ?? '');
    setEditPhoto(editingContact?.data?.photo ?? '');
  }, [editingContact]);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleEdit = async (id: string) => {
    setDialogOpenEdit(true);
    const contact = await fetchContactsPerId(id);
    setEditingContact(contact);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`https://contact.herokuapp.com/contact/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);
      toast("Contact deleted successfully.")
    } catch (error) {
      console.error(error);
      toast("An error occurred while trying to delete the contact. Please try again.")
    }
  };

  const handleUpdate = async (event: { preventDefault: () => void }, id: string) => {
    event.preventDefault();

    try {
      if (editingContact) {
        const response = await axios.put(`https://contact.herokuapp.com/contact/${id}`, {
          firstName: (editingContact as any).firstName,
          lastName: (editingContact as any).lastName,
          age: Number((editingContact as any).age),
          photo: (editingContact as any).photo,
        });

        console.log(response.data, 'response.data from update');
        console.log(editingContact, 'editingContact');
        setEditingContact(null);
        setDialogOpenEdit(false);
        toast("Contact updated successfully.")
      }
    } catch (error) {
      console.error(error);
      setEditingContact(null);
      setDialogOpenEdit(false);
      toast("An error occurred while trying to update the contact. Please try again.")
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/contacts', {
        firstName,
        lastName,
        age: Number(age),
        photo,
      })
      console.log(response.data)
      handleDialogClose()
      toast("New contact created successfully. You can view it in the list below.")
      // Refetch the contacts data
      const newContacts = await fetchContacts()
      setUpdatedContacts(newContacts)
    } catch (error) {
      console.error(error)
      handleDialogClose()
      toast("An error occurred while trying to create a new contact. Please try again.")
    }
  }
  return (
    <Layout>
      <Dialog open={dialogOpen} modal onOpenChange={setDialogOpen}  >
        <DialogTrigger asChild>
          <Button className="bg-green-400 hover:bg-green-700 text-stone-950 hover:text-stone-50" onClick={handleDialogOpen}>Make a New Contact</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <form onSubmit={handleSubmit} className='flex flex-col gap-2 py-4 text-stone-950'>
                <Label>
                  First Name:
                  <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </Label>
                <Label>
                  Last Name:
                  <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </Label>
                <Label>
                  Age:
                  <Input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                </Label>
                <Label>
                  Photo URL:
                  <Input id="picture" type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                </Label>

                <Button className='mt-4' type="submit">Submit</Button>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
        {updatedContacts.data.map(contact => {
          return (
            <div key={contact.id} className="py-4 grid grid-cols-1 md:grid-cols-2 items-center md:gap-4">
              {/* <h1>
                {contact.id}
              </h1> */}
              <div className='flex flex-col'>
                {contact.photo !== 'N/A' && !contact.photo.includes('fakepath') ? (
                  <Image
                    className="rounded-xl aspect-video object-cover"
                    src={contact.photo ? contact.photo : "https://via.placeholder.com/500"}
                    width={500}
                    height={500}
                    alt={contact.firstName ? `${contact.firstName} ${contact.lastName}` : "No image found"}
                    onError={(event) => {
                      event.currentTarget.id = "https://via.placeholder.com/500";
                      event.currentTarget.srcset = "https://via.placeholder.com/500";
                    }}
                  />
                ) : (
                  <div className="placeholder-image">
                    <Image
                      className="rounded-xl aspect-video object-cover"
                      src={"https://via.placeholder.com/500"}
                      width={500}
                      height={500}
                      alt={`${contact.firstName} ${contact.lastName}`}
                    />
                  </div>
                )}
              </div>
             
              <div className="flex flex-col justify-between">
                <div className="flex py-1 pb-4 md:pb-1 justify-between px-1">
                  <h2 className="font-bold">{contact.firstName} {contact.lastName}</h2>
                  <p>{contact.age} Years Old</p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button asChild>
                    <Link href={`/contact/${contact.id}`} className='hover:text-stone-50'>View Details</Link>
                  </Button>

                  <Dialog open={dialogOpenEdit} onOpenChange={setDialogOpenEdit}>
                    <DialogTrigger asChild>
                      <Button className="bg-indigo-500" onClick={() => handleEdit(contact.id)}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                        {loading ? (
                          <div>Loading...</div>
                        ) : (
                          <form onSubmit={(e) => handleUpdate(e, contact.id)} className='flex flex-col gap-2 py-4 text-stone-950'>
                            <Label>
                              First Name:
                              <Input type="text" value={editFirstName} onChange={(e) => setEditFirstName(e.target.value)} required />
                            </Label>
                            <Label>
                              Last Name:
                              <Input type="text" value={editLastName} onChange={(e) => setEditLastName(e.target.value)} required />
                            </Label>
                            <Label>
                              Age:
                              <Input type="number" value={editAge} onChange={(e) => setEditAge(e.target.value)} required />
                            </Label>
                            <Label>
                              Photo URL:
                              <Input id="picture" type="text" value={editPhoto} onChange={(e) => setEditPhoto(e.target.value)} />
                            </Label>

                            <Button className='mt-4' type="submit">Submit</Button>
                          </form>
                        )}

                    </DialogContent>
                  </Dialog>

                  <Button variant={"destructive"} onClick={() => handleDelete(contact.id)} className='hover:bg-red-700'>

                  Delete
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  )
}