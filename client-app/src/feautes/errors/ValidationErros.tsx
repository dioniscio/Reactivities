import React from 'react'
import { Message } from 'semantic-ui-react'

interface Props {
    errors: string[];
}

export default function ValidationErros({errors}:Props) {
    return (
        <div>
           <Message  error>
            
            {errors.map((err:any,i)=>(
                <Message.Item key={i}>{err}</Message.Item>
            ))
                
            }
            
           </Message>
        </div>
    )
}
