export const drawerUsageCode = `import { useState } from 'react'
import { Drawer, Button } from 'oryn-ui'

export default function DrawerExample() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        Open Drawer
      </Button>
      
      <Drawer 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        position="right"
        size="md"
      >
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2">Drawer Content</h3>
          <p className="text-muted-foreground">Your slide-over panel content here...</p>
        </div>
      </Drawer>
    </>
  )
}`

export const accordionUsageCode = `import { Accordion } from 'oryn-ui'

export default function AccordionExample() {
  const items = [
    {
      id: 'item1',
      title: 'What is React?',
      content: 'React is a JavaScript library for building user interfaces.'
    },
    {
      id: 'item2', 
      title: 'How do components work?',
      content: 'Components are like functions that return React elements describing what should appear on screen.'
    }
  ]
  
  return (
    <Accordion 
      items={items}
      allowMultiple={true}
      defaultOpen={[0]}
    />
  )
}`
