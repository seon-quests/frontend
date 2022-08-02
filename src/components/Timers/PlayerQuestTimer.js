import Timer from "react-compound-timerv2";
import React from 'react';

const withTimer = timerProps => WrappedComponent => wrappedComponentProps => (
    <Timer {...timerProps}>
        {timerRenderProps =>
            <WrappedComponent {...wrappedComponentProps} timer={timerRenderProps} />}
    </Timer>
);

class ClockUp extends React.Component {
    setTime(){
        const { setTime } = this.props.timer;
        setTime(this.props.currentTime);
    }
    startOrStopTimer(){
        const { stop, start } = this.props.timer;
        if(this.props.isQuestFinished){
            stop();
        }
        else {
            start();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.currentTime !== this.props.currentTime) {
            this.setTime();
        }
        if (prevProps.isQuestFinished !== this.props.isQuestFinished) {
            this.startOrStopTimer();
        }
    }

    render() {
        return (
            <>
                <Timer.Hours/>:
                <Timer.Minutes/>:
                <Timer.Seconds />
            </>
        );
    }
}

const PlayerQuestTimer = withTimer({
    direction: 'forward',
    initialTime: 0,
    lastUnit: "h",
    startImmediately: false,
})(ClockUp);

export default PlayerQuestTimer;