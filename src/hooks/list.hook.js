import { useState, useEffect } from "react";
import useMarvelService from "../services/MarvelService";

let initialLoad = false;

export const useList = ({limit, type}) => {
    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(410);
    const [itemEnded, setItemEnded] = useState(false);

    const {loading, error, getAllList} = useMarvelService();

    useEffect(() => {
        onRequest(offset);
    }, [])

    const onRequest = (offsetArg) => {
        onListLoading(true);
        initialLoad = false;

        getAllList(limit, type, offsetArg)
            .then(onLoaded);
    }

    const onListLoading = (initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
    }

    const onLoaded = (newItem) => {
        let ended = false;
        if (newItem.length < limit) {
            ended = true;
        }

        if (!initialLoad) {
            initialLoad = true;
            setList(items => [...items, ...newItem]);
            setNewItemLoading(newItemLoading => false);
            setOffset(offset => offset + limit);
            setItemEnded(itemEnded => ended);
        }
    }

    return {list, offset, newItemLoading, itemEnded, loading, error, onRequest}

}