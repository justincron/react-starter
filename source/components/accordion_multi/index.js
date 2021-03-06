// Dependencies.
import React from 'react'

// Utility methods.
import fake from '../../fake'

// UI components.
import Accordion from '../accordion'

// Define class.
class AccordionMulti extends React.Component {
  // Render method.
  render () {
    return (
      <Accordion {...this.props} multi />
    )
  }
}

// Validation.
AccordionMulti.propTypes = {
  children: React.PropTypes.node,
  id: React.PropTypes.string,
  selected: React.PropTypes.object
}

// Defaults.
AccordionMulti.defaultProps = {
  children: fake.accordion()
}

// Export.
export default AccordionMulti
