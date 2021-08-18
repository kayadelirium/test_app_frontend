import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { compareNodes } from '../../helpers/compareNodes';
import {
    errorMessageSelector,
    nodesDisorderedListSelector,
    nodesIdsSelector,
    parentNamesSelector,
} from '../../redux/selectors';
import { useAppDispatch } from '../../redux/store';
import {
    addNodeThunk,
    changeNodeThunk,
    deleteAllThunk,
    deleteNodeThunk,
    fetchAllNodesThunk,
    setErrorMessageThunk,
    sortNodesDirectThunk,
    sortNodesReverseThunk,
} from '../../redux/thunks';
import { INode } from '../../types';
import { AddModal } from '../Modals&Forms/AddModal';
import { DeleteModal } from '../Modals&Forms/DeleteModal';
import { NodeModal } from '../Modals&Forms/NodeModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ChangeTable = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    const nodes = useSelector(nodesDisorderedListSelector);
    const nodesIds = useSelector(nodesIdsSelector);
    const parentName = useSelector(parentNamesSelector);
    const messages = useSelector(errorMessageSelector);

    const [active, setActive] = useState({} as INode);
    const [updatedNodes, setUpdatedNodes] = useState([] as INode[]);
    const [isUpdated, setUpdated] = useState(false);
    const [sortedColumn, setSortedColumn] = useState<string[]>(['', 'desc']);

    const [isDeleteModal, setDeleteModal] = useState(false);
    const [isAddModal, setAddModal] = useState(false);

    useEffect(() => {
        dispatch(deleteAllThunk());
        dispatch(fetchAllNodesThunk());
    }, [dispatch]);

    useEffect(() => {
        setUpdatedNodes(nodes);
    }, [messages, nodesIds]);

    useEffect(() => {
        sortedColumn[1] === 'asc'
            ? dispatch(sortNodesDirectThunk(sortedColumn[0]))
            : dispatch(sortNodesReverseThunk(sortedColumn[0]));
    }, [dispatch, sortedColumn]);

    const addNode = (valueNode: INode) => {
        dispatch(addNodeThunk(valueNode));
        setAddModal(false);
    };

    const deleteNode = (activeNode: INode) => {
        dispatch(deleteNodeThunk(activeNode));
        setDeleteModal(false);
    };

    const parentNameOf = (node: INode) => {
        const value = parentName.get(node.parentId);
        return value ? value : t`no parent`;
    };

    const changer = (input: any, node: INode) => {
        if (
            !input.validity.patternMismatch &&
            !input.validity.rangeOverflow &&
            !input.validity.rangeUnderflow &&
            !input.validity.valueMissing
        ) {
            if (isUpdated) {
                dispatch(changeNodeThunk(node));
                setUpdated(false);
            }
        } else {
            dispatch(setErrorMessageThunk(input.name));
            setUpdatedNodes(nodes);
        }
    };

    const onInputChange =
        (node: INode) => (e: React.ChangeEvent<HTMLInputElement>) => {
            e.preventDefault();
            const newNode = {
                ...node,
                [e.currentTarget.name]: e.currentTarget.value.trim(),
            };
            setUpdated(!compareNodes(node, newNode));
            const newNodes = [] as INode[];
            updatedNodes.forEach((current) => {
                current.id !== node.id
                    ? newNodes.push(current)
                    : newNodes.push(newNode);
            });
            setUpdatedNodes(newNodes);
        };

    const onInputBlur =
        (node: INode) => (e: React.FocusEvent<HTMLInputElement>) => {
            const input = e.currentTarget;
            changer(input, node);
        };

    const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') e.currentTarget.blur();
        e.currentTarget.focus();
    };

    const onRowFocus =
        (node: INode) => (e: React.FocusEvent<HTMLTableRowElement>) => {
            setActive(node);
        };

    const onRowKeyDown =
        (index: number) => (e: React.KeyboardEvent<HTMLTableRowElement>) => {
            switch (e.key) {
                case 'Delete': {
                    setDeleteModal(true);
                    break;
                }
                case 'Insert': {
                    setAddModal(true);
                    break;
                }
                case 'ArrowUp': {
                    e.currentTarget.blur();
                    e.currentTarget.parentElement
                        ?.getElementsByTagName('tr')
                        [index ? index - 1 : nodes.length - 1].focus();
                    break;
                }
                case 'ArrowDown': {
                    e.currentTarget.blur();
                    e.currentTarget.parentElement
                        ?.getElementsByTagName('tr')
                        [(index + 1) % nodes.length].focus();
                    break;
                }
            }
        };

    const onHeadClick = (
        e: React.MouseEvent<HTMLTableHeaderCellElement, MouseEvent>
    ) => {
        setSortedColumn([
            e.currentTarget.id,
            e.currentTarget.id === sortedColumn[0]
                ? sortedColumn[1] === 'desc'
                    ? 'asc'
                    : 'desc'
                : 'asc',
        ]);
    };

    const filterSign = (column: string) => {
        return sortedColumn[0] === column ? (
            sortedColumn[1] === 'asc' ? (
                <FontAwesomeIcon icon={'sort-down'} />
            ) : (
                <FontAwesomeIcon icon={'sort-up'} />
            )
        ) : (
            <div />
        );
    };

    return (
        <div className="mx-5">
            <NodeModal
                type="Add"
                activeNode={active}
                isModal={isAddModal}
                setModal={setAddModal}
                action={addNode}
            />
            <NodeModal
                type="Delete"
                activeNode={active}
                isModal={isDeleteModal}
                setModal={setDeleteModal}
                action={deleteNode}
            />
            <div className="d-flex justify-content-end mb-1">
                <AddModal activeNode={active}></AddModal>
                <DeleteModal activeNode={active}></DeleteModal>
            </div>

            <Table hover bordered striped>
                <thead>
                    <tr>
                        <th id="name" onClick={onHeadClick}>
                            <div className="d-flex justify-content-between">
                                <div>{t`Name`} </div>
                                {filterSign('name')}
                            </div>
                        </th>
                        <th id="ipAddress" onClick={onHeadClick}>
                            <div className="d-flex justify-content-between">
                                <div>{t`IP address`} </div>
                                {filterSign('ipAddress')}
                            </div>
                        </th>
                        <th id="port" onClick={onHeadClick}>
                            <div className="d-flex justify-content-between">
                                <div>{t`Port`} </div>
                                {filterSign('port')}
                            </div>
                        </th>
                        <th id="parentId" onClick={onHeadClick}>
                            <div className="d-flex justify-content-between">
                                <div>{t`Parent name`} </div>
                                {filterSign('parentId')}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {updatedNodes.map((node: INode, index: number) => (
                        <tr
                            tabIndex={0}
                            key={node.id}
                            className={'change-table__row'}
                            onFocus={onRowFocus(node)}
                            onKeyDown={onRowKeyDown(index)}
                        >
                            <td width="25%">
                                <input
                                    className="change-table__row__input"
                                    value={node.name}
                                    name="name"
                                    onChange={onInputChange(node)}
                                    onKeyDown={onInputKeyDown}
                                    onBlur={onInputBlur(node)}
                                    type="text"
                                    required
                                ></input>
                            </td>
                            <td width="25%">
                                <input
                                    className="change-table__row__input"
                                    value={node.ipAddress}
                                    name="ipAddress"
                                    onChange={onInputChange(node)}
                                    onKeyDown={onInputKeyDown}
                                    onBlur={onInputBlur(node)}
                                    required
                                    pattern={
                                        '^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
                                    }
                                ></input>
                            </td>
                            <td width="25%">
                                <input
                                    className="change-table__row__input"
                                    value={node.port}
                                    name="port"
                                    onChange={onInputChange(node)}
                                    onKeyDown={onInputKeyDown}
                                    onBlur={onInputBlur(node)}
                                    type="number"
                                    min={0}
                                    max={65535}
                                    required
                                ></input>
                            </td>
                            <td width="25%">
                                <input
                                    value={parentNameOf(node)}
                                    name="parentId"
                                    disabled
                                ></input>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
