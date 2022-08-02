import React from 'react';
import {Button, FormGroup, Input, Modal, Form} from "reactstrap";
import {useFormik} from "formik";

const CreateTeamModal = ({isOpen, onClose, onConfirm}) => {
    const createTeamForm = useFormik(
        {
            initialValues: {
                "name": "",
            },
            onSubmit: (values) => {
                onConfirm(values);
            }
        }
    )
    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={isOpen}
        >
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                    Створити команду
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
            <Form role="form" onSubmit={createTeamForm.handleSubmit}>
                <div className="px-4">
                    <FormGroup>
                        <Input
                            className="form-control-alternative"
                            placeholder="Моя супер команда"
                            rows="4"
                            type="input"
                            name="name"
                            value={createTeamForm.values.name}
                            onChange={createTeamForm.handleChange}
                        />
                    </FormGroup>
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
                    <Button color="primary" type="submit">
                        Створити
                    </Button>
                </div>
            </Form>

        </Modal>
    );
};

export default CreateTeamModal;