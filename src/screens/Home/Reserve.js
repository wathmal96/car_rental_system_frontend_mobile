import { Text } from "react-native"
import { Button } from 'react-native-paper';

export default function Reserve() {
    return (
        <>
            <Text>Reserve</Text>
            <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
                Press me
            </Button>

        </>

    )
}