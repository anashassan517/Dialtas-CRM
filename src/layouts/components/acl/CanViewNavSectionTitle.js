// ** React Imports
import { useContext } from 'react'

// ** Component Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'
import { useAuth } from 'src/hooks/useAuth'
const CanViewNavSectionTitle = props => {
    const { children } = props
  
      return <>{children}</>
  }

export default CanViewNavSectionTitle
