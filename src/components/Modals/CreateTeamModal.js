import React from 'react';
import {Button, FormGroup, Input, Modal, Form, FormFeedback} from "reactstrap";
import {useFormik} from "formik";
import {object, string} from "yup";

const CreateTeamModal = ({isOpen, onClose, onConfirm}) => {
    const validationSchema = object({
        name: string().required("Поле обов`язкове")
    });
    const createTeamForm = useFormik(
        {
            initialValues: {
                "name": "",
            },
            validationSchema: validationSchema,
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
                            className={`form-control-alternative ${createTeamForm.errors.name ? 'is-invalid': ''}`}
                            placeholder="Моя супер команда"
                            rows="4"
                            type="input"
                            name="name"
                            value={createTeamForm.values.name}
                            onChange={createTeamForm.handleChange}
                        />
                        <FormFeedback>{createTeamForm.errors.name}</FormFeedback>
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