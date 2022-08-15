import {Button, Modal} from "reactstrap";

const ConfirmationDeletingQuestStageModal = ({isOpen, onClose, onConfirm}) => {

    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={isOpen}
        >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    Видалити етап квесту
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
                Натискаючи "Видалити", Ви назавжди втратите цей етап квесту.
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
                    Видалити
                </Button>
            </div>

        </Modal>
    );
};

export default ConfirmationDeletingQuestStageModal;