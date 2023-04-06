import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from "yup";
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './charSearchInfo.scss';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharSearchInfo = () => {

    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacterByName} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(onCharLoaded)
    }

    const errorMessage = error ? <div className="error"><ErrorMessage /></div> : null;
    const results = !char ? null : char.length > 0 ? 
                    <div className="char__search-container">
                        <div className="success">There is! Visit {char[0].name} page?</div>
                        <Link to={`/characters/${char[0].id}`} className="button button__secondary">
                            <div className="inner">To Page</div>
                        </Link>
                    </div> :
                    <div className="error">
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="char__search-info">
            <Formik 
                initialValues = {{charName: ''}}
                validationSchema = {Yup.object({
                    charName: Yup.string()
                            .required("This field is required")
                })}
                onSubmit = {({charName}) => {
                    updateChar(charName)}
                }>
                <Form className="char__search">
                    <label className="char__search-title">Or find a character by name:</label>
                    <div className="char__search-container">
                        <Field 
                            type="text" 
                            id="charName"
                            name="charName"
                            placeholder='Enter name' 
                            className="char__search-input" />
                        <button className="button button__main" type="submit" disabled={loading}>
                            <div className="inner">Find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharSearchInfo;