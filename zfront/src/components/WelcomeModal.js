import React from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'

function WelcomeModal() {
  const [open, setOpen] = React.useState(true)

  return (
    <Modal
      dimmer='blurring'
      open={open}
      size='tiny'
      trigger={
        <div>
          Helpful Postings
        </div>
      }
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Modal.Content scrolling>
        <div>
          <div className="text-2xl">Pan Galactic Gargle Blasters' "Project 42"</div>
          <div className="mt-6 italic">"The answer to the great question of life the universe and everything is… 42!"</div>
          <div className="mt-2 ml-10">- Supercomputer Deep Thought</div>
          <div className="mt-6 text-center text-sm text-blue-800">Click on any posting to view or edit its details</div>
          <div className="mt-1 text-center text-sm text-blue-800">Hover over any field in a posting to edit</div>
        </div>
      </Modal.Content>

      <Modal.Actions>
        <Button basic color='green' onClick={() => setOpen(false)}>
          <Icon name='checkmark' /> Start Exploring
        </Button>

      </Modal.Actions>
    </Modal>
  )
}

export default WelcomeModal