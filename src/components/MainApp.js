import React, { useState, useCallback, useEffect } from 'react'
// import Footer from './Footer'
// import AddTodo from '../containers/AddTodo'
// import VisibleTodoList from '../containers/VisibleTodoList'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { Stage, Layer } from 'react-konva';
import Konva from 'konva';
import { useDispatch, useSelector } from 'react-redux';

import { addElement, importData } from './../redux/actions'
import { downloadURI } from './../utils'
import URLImage from './URLImage'
import { styled } from '@mui/material/styles';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

const MainApp = () => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const layerRef = React.useRef();

    const dispatch = useDispatch();
    const elements = useSelector(state => state.elements)

    console.log('elements', elements);

    const handleExport = () => {
        const json = stageRef.current.toJSON();
        downloadURI(json, 'plan.json');
    };

    const handleDrop = (e) => {
        stageRef.current.setPointersPositions(e);
        dispatch(
            addElement({
                ...stageRef.current.getPointerPosition(),
                    src: dragUrl.current.src,
                    id: dragUrl.current.id,
            })
        )
    };

    const handleDragStart = (e) => {
        dragUrl.current = e.target;
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    // const handleRemove = (image) => {
    //     dispatch(
    //         removeElement(image)
    //     )
    // };

    const handleImport = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];

            const  fileReader = new FileReader();
            fileReader.onload = function(){
                console.log(fileReader.result);

                // stageRef.current = Konva.Node.create(fileReader.result, stageRef.current);
                // Konva.Node.create(fileReader.result, stageRef.current);

                // console.log('data',
                //     JSON.parse(fileReader.result)
                // );

                dispatch(
                    importData(
                        JSON.parse(fileReader.result)
                    )
                );
            }
            fileReader.readAsText(file);
        }
    }


    return  (
        <div>
            <Stack direction='column' width="100%" height='100%'>
                <Stack direction='row' spacing={1}>
                    <Button onClick={handleExport}>Export</Button>
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                    >
                            Upload files
                            <VisuallyHiddenInput
                                type="file"
                                onChange={handleImport}
                                multiple
                            />
                            </Button>
                </Stack>
                    <Box direction='row' spacing={1}>
                        <img
                            id={1}
                            height={50}
                            width={50}
                            alt="lion"
                            src="https://konvajs.org/assets/lion.png"
                            draggable="true"
                            onDragStart={handleDragStart}
                        />
                    </Box>

                <Box display={'block'}>
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <Stage
                            width={parseInt(window.innerWidth) / 2 }
                            height={window.innerHeight - 100}
                            style={{ border: '1px solid grey' }}
                            ref={stageRef}
                        >
                            <Layer ref={layerRef}>
                                {Object.values(elements||{}).map((image, index) => {
                                    return (
                                        <URLImage
                                            key={image.uuid}
                                            image={image}
                                        />
                                    );
                                })}
                            </Layer>
                        </Stage>
                    </div>
                </Box>
            </Stack>
        </div>
        )
}

export default MainApp
