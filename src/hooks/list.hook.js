import { useState, useEffect } from "react";
import useMarvelService from "../services/MarvelService";

export const useList = (props) => {
    const [list, setList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [itemEnded, setItemEnded] = useState(false);

    const {loading, error, getAllList} = useMarvelService();

    useEffect(() => {
        onRequest(offset);
    }, [])

    const onRequest = (offset) => {
        onListLoading(true);

        getAllList(props.limit, props.type, offset)
            .then(onLoaded);
    }

    const onListLoading = (initial) => {
        console.log(newItemLoading)
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
    }

    const onLoaded = (newItem) => {
        let ended = false;
        if (newItem.length <= props.limit) {
            ended = true;
        }

        setList(items => [...items, ...newItem]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + props.limit);
        setItemEnded(comicEnded => ended);
    }

    return {list, offset, newItemLoading, itemEnded, loading, error, onRequest}

}