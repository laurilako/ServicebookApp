import { 
    Stack,
    Alert,
    AlertIcon
} from '@chakra-ui/react';

function Message(props){   
    if (props.status === 'error'){
        return(
            <Stack p='5'spacing={3}>
                <Alert status='error'>
                    <AlertIcon />
                    {props.message}
                </Alert>
            </Stack>
        )
    }
    if (props.status === 'success'){
        return(
            <Stack p='5' spacing={3}>
                <Alert status='success'>
                    <AlertIcon />
                    {props.message}
                </Alert>
            </Stack>
        )
    }
}

export default Message;