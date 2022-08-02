import {Button, Modal} from "reactstrap";

const TeamRegisterToQuestModal = ({isOpen, onClose, onConfirm}) => {

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={isOpen}
        >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    Ви впевнені, що хочете зареєструватись на квест?
                </h5>
                <button
                    aria-label="Close"
                    className="close"
                    data-dismiss="modal"
                    type="button"
                    onClick={onClose}
                >
                    <span aria-hidden={true}>×</span>
                </button>
            </div>
            <div className="px-4">
                Натискаючи "Зареєструватись", Ви даєте свою згоду на участь у квесті.
            </div>
            <div className="modal-footer">
                <Button
                    color="secondary"
                    data-dismiss="modal"
                    type="button"
                    onClick={onClose}
                >
                    Закрити
                </Button>
                <Button color="primary" type="button" onClick={onConfirm}>
                    Зареєструватись
                </Button>
            </div>

        </Modal>
    );
};

export default TeamRegisterToQuestModal;