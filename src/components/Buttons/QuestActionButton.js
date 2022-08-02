import {Button} from "reactstrap";
import {useEffect, useState} from "react";

const QuestActionButton = ({hasTeam, quest, registerAction, startingQuestAction, continuingQuestAction}) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [buttonText, setButtonText] = useState('Дія неможлива');
    const [buttonAction, setButtonAction] = useState('wait');


    function triggerButtonAction() {
        if (buttonAction === 'register'){
            return registerAction(quest.id);
        } else if (buttonAction === 'start'){
            return startingQuestAction(quest.id);
        }
        else if (buttonAction === 'continue'){
            return continuingQuestAction(quest.id)
        }
        else if (buttonAction === 'decline'){
            return alert('Вашу участь відхилено')
        }
        else{
            //wait
            return alert('Очікуйте оновлення статусу')
        }
    }

    // buttonActions : wait, register, start, continue, decline
    const buttonParsing = () => {
        if (quest.is_accepted === undefined) {
            setButtonDisabled(false);
            setButtonText('Зареєструватись')
            setButtonAction('register')
        }
        else if (quest.is_accepted === true && quest.status === 'registration') {
            setButtonDisabled(true);
            setButtonText('Підтверджено участь')
            setButtonAction('wait')
        } else if (quest.is_accepted === true && quest.is_started === false && quest.status === 'started') {
            setButtonDisabled(false);
            setButtonText('Розпочати квест')
            setButtonAction('start')
        } else if (quest.is_accepted === true && quest.is_started === true && quest.status === 'started') {
            setButtonDisabled(false);
            setButtonText('Продовжити квест')
            setButtonAction('continue')
        } else if (quest.is_accepted === false) {
            setButtonDisabled(true);
            setButtonText('Відхилено участь')
            setButtonAction('decline')
        } else if (quest.is_accepted === null) {
            setButtonDisabled(true);
            setButtonText('Очікується підтвердження')
            setButtonAction('wait')
        } else {
            setButtonDisabled(true);
            setButtonText('Дія неможлива')
            setButtonAction('wait')
        }
    }

    useEffect(()=>{
        buttonParsing()
    }, [quest])

    return (
        <Button color="info" outline type="button" disabled={!hasTeam||buttonDisabled} onClick={triggerButtonAction}>
            {buttonText}
        </Button>
    );
}
export default QuestActionButton;