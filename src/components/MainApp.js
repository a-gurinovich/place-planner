import React from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Stage, Layer } from 'react-konva';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { addElement, importData } from './../redux/actions'
import { downloadURI } from './../utils'
import URLImage from './URLImage'
import ScrollingWrapper from './ScrollingWrapper'
import Table2Person from './../assets/images/table-2-person.png'
import Table4Person from './../assets/images/table-4-person.png'
import Table6Person from './../assets/images/table-6-person.png'
import Table7Person from './../assets/images/table-7-person.png'
import TableBig4Person from './../assets/images/table-big-4-person.png'
import TableBig6Person from './../assets/images/table-big-6-person.png'

const TABLES = [{
    id: 1,
    img: Table2Person,
    name: 'Table2Person'
}, {
    id: 2,
    img: Table4Person,
    name: 'Table4Person',
}, {
    id: 3,
    img: Table6Person,
    name: 'Table6Person'
}, {
    id: 4,
    img: Table7Person,
    name: 'Table7Person'
}, {
    id: 5,
    img: TableBig4Person,
    name: 'TableBig4Person'
}, {
    id: 6,
    img: TableBig6Person,
    name: 'TableBig6Person'
}
]


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
                    <ScrollingWrapper overflowY='hidding' component={Paper}>
                        <Stack direction='row' spacing={2} px={2}>
                            {TABLES.map(({ img, name, id }) => (
                                <img
                                id={id}
                                height={50}
                                width={50}
                                alt={name}
                                src={img}
                                draggable="true"
                                onDragStart={handleDragStart}
                            />
                            ))}

                        </Stack>
                    </ScrollingWrapper>

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
