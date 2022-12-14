import React, {useEffect, useState} from 'react';
import Header from "../../components/Headers/Header";
import {
    Form,
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container, FormGroup,
    Input,
    Progress,
    Row
} from "reactstrap";
import {answerQuestStage, getCurrentQuestStage} from "../../services/questStages";
import {useParams} from "react-router-dom";
import PlayerQuestTimer from "../../components/Timers/PlayerQuestTimer";
import {useFormik} from "formik";


const PlayerQuestStage = () => {
    const {id} = useParams();
    const [canSkip, setCanSkip] = useState(false);
    const [currentStage, setCurrentStage] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);

    const progressBarPercentage = () => {
      if(currentStage){
          return currentStage.latest_stage / currentStage.total_stages * 100
      }
      return 0
    }

    const questIsFinished = () => {
        if(currentStage){
            return (
                currentStage.total_stages === 0 || currentStage.quest.status === 'finished' ||
                currentStage.latest_stage === currentStage.total_stages
                && currentStage.total_stages!==0
                && currentStage.quest.status === 'started'
            )
        }
        return true;
    }

    const calculateCurrentTime = () => {
        if(currentStage && !questIsFinished()){
            const date = new Date(currentStage.quest.start_datetime);
            const now = Date.now();
            setCurrentTime(now - date.getTime())
            return
        }
        else if (currentStage && questIsFinished()){
            const date = new Date(currentStage.quest.start_datetime);
            const last_answered_date = new Date(currentStage.latest_stage_answered_at)
            setCurrentTime(last_answered_date.getTime() - date.getTime())
            return
        }
        setCurrentTime(0)
    }

    async function fetchCurrentQuestStage() {
        try {
            const data = await getCurrentQuestStage(id)
            console.log(data)
            setCurrentStage(data);
        } catch (e) {
            console.log(e);
        }
    }

    const answerQuestStageForm = useFormik(
        {
            initialValues: {
                "answer": "",
            },
            onSubmit: async (values, {resetForm}) => {
                try {
                    const response = await answerQuestStage(values, id, currentStage.current_stage.id);
                    if (response.quest) {
                        alert('??????????! ??????????????????!')
                        resetForm()
                        setCurrentStage(response)
                    }
                    else if(response.detail === "not active"){
                        alert('?????????? ????????????????????')
                        window.location.reload();
                    }
                    else if(response.detail){
                        alert('?????????????????????? ??????????????????.')
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        }
    )

    useEffect( () => {
        fetchCurrentQuestStage();
    }, [])

    useEffect(()=>{
       calculateCurrentTime();
    }, [currentStage])

    return (
        <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Row className="mb-1">
                    <Col lg="8" xl="8" sm="12" className="mb-1">
                        <Card>
                            <CardBody>
                                <div className="progress-wrapper">
                                    <div className="progress-info">
                                        <div className="progress-label">
                                            <span>?????????????? ????????????</span>
                                        </div>
                                        <div className="progress-percentage">
                                            <span>{progressBarPercentage()}%</span>
                                        </div>
                                    </div>
                                    <Progress
                                        max={currentStage ? currentStage.total_stages : 0}
                                        value={currentStage ? currentStage.latest_stage : 0}
                                        color="green"
                                    />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="4" xl="4" sm="12">
                        <Card className="card-stats">
                            <CardBody>
                                <Row>
                                    <div className="col">
                                        <CardTitle className="text-uppercase text-muted mb-0">
                                            ?????????????????? ??????
                                        </CardTitle>
                                        <h1 className="display-2">
                                            <PlayerQuestTimer currentTime={currentTime} isQuestFinished={questIsFinished()} />
                                        </h1>
                                    </div>
                                    <Col className="col-auto">
                                        <div className="icon icon-shape bg-green text-white rounded-circle shadow">
                                            <i className="fa fa-clock"/>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <div className="col">
                        <Card>
                            <CardBody>
                                {
                                    questIsFinished() ?
                                        <div>??????????????! ???? ?????????????? ?????????????? ?????? ?????????? ?????? ?? ?????????? ???????????? ???? ?????????? ????????????...</div>
                                        :
                                        <Form role="form" onSubmit={answerQuestStageForm.handleSubmit}>
                                            <Row className="align-items-center">
                                                <div className="col ml--2">
                                                    <h4 className="mb-0">
                                                        ????????
                                                    </h4>
                                                    <p className="text-md text-muted mb-2">{
                                                        currentStage ?
                                                            currentStage.current_stage.description :
                                                            '?????????????? ???????????????????????? ??????????'
                                                    }</p>
                                                    <FormGroup>
                                                        <Input
                                                            className="mb-2"
                                                            placeholder="?????????????? ?????????????????? ??????..."
                                                            type="input"
                                                            name="answer"
                                                            value={answerQuestStageForm.values.answer}
                                                            onChange={answerQuestStageForm.handleChange}
                                                        />
                                                    </FormGroup>
                                                    <Button color="primary" outline type="submit" disabled={questIsFinished() || answerQuestStageForm.isSubmitting}>
                                                        ????????????????????
                                                    </Button>
                                                    {
                                                        canSkip ?
                                                            <Button color="warning" outline type="submit">
                                                                ????????????????????
                                                            </Button>
                                                            :
                                                            ""
                                                    }
                                                </div>
                                            </Row>
                                        </Form>
                                }
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default PlayerQuestStage;