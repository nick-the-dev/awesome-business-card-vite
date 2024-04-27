import { Button } from '@/components/ui/button'

type AddToContactsButtonProps = {
  name: string
  phoneNumber: string
  buttonText: string
}

const AddToContactsButton = ({
  name,
  phoneNumber,
  buttonText,
}: AddToContactsButtonProps) => {
  const handleAddToContacts = () => {
    const vCardData = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `N:;${name};;;`,
      `FN:${name}`,
      `TEL;TYPE=cell,voice;VALUE=uri:${phoneNumber}`,
      'END:VCARD',
    ].join('\r\n')

    const blob = new Blob([vCardData], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'contact.vcf'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Button
      variant="rounded"
      className="text-2xl text-white gap-2 addToContactsButton"
      onClick={handleAddToContacts}
    >
      {buttonText}
      <span className="text-5xl">+</span>
    </Button>
  )
}

export { AddToContactsButton }
