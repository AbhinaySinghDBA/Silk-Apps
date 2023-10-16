import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'

const TableView = ({ isData, meta, labels, datasets }) => {

    const [data, setData] = useState({
        labels: labels,
        rowLabels: [],
        rowData: []
    })

    const d = () => {
        if (!isData) return
        const tempBody = { ...data }
        let rowLabels = ["Matric"]
        let rowData = []

        for (const item of datasets) {
            rowLabels.push(item.label)
            rowData.push(item.data)
        }

        tempBody.rowLabels = rowLabels
        tempBody.rowData = rowData

        setData(tempBody)
    }

    useEffect(() => {
        d()
    }, [])

    const scrollViewWidth = (data.labels.length + 1) * 125;

    return (
        <View style={styles.tableContainer}>
            <View style={styles.freezCol}>
                {data?.rowLabels.map((label) =>
                    <Text
                        key={"freez_col_" + label}
                        style={[styles.cell, styles.freezColText]}>
                        {label}
                    </Text>
                )}

            </View>
            <ScrollView
                style={[styles.ScrollView]}
                horizontal={true}
                contentContainerStyle={{ width: scrollViewWidth }}
            >
                <View>
                    <View style={[styles.row, styles.firstRowCell]}>
                        {data?.labels.map((label) =>
                            <Text
                                key={"table_heading_" + label}
                                style={[styles.cell, styles.firstRowText]}>
                                {label}
                            </Text>
                        )}
                    </View>
                    {data?.rowData.map((label, idx) =>
                        <View horizontal={true}
                            style={[styles.row]}
                            key={`table_row_data__${idx}`}
                        >
                            {label.map((data, i) =>
                                <View style={[styles.column]} key={`table_cell_data__${i}__` + data}>
                                    <Text style={[styles.cell, styles.number]}>{data}</Text>
                                </View>
                            )}
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    number: {
        textAlign: "center",
        borderColor: "#ebf0ed",
        borderBottomWidth: 2,
        marginBottom: 2,
        borderRightWidth: 2,




    },
    firstRowText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: '#3a7953',
        textAlign: "center",
        borderRightWidth: 4,


    },

    cell: {
        flexWrap: "wrap",
        textAlign: "center",
        fontWeight: "bold",
        width: 150,
        height: 50,
        textAlignVertical: "center",
        borderColor: 'white',
        fontSize: 16,
        height: 70,
        borderBottomWidth: 1,



    },

    freezColText: {
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: "#3a7953",
        width: 150,
        textAlign: "center",
        textAlignVertical: "center",
        marginBottom: 2,
        paddingHorizontal: 8,
        height: 70,
    },

    freezCol: {
        width: 150,

    },

    tableContainer: {
        flexDirection: "row",

    },

    row: {
        flexDirection: "row",
        marginHorizontal: 5,
    },

    column: {
        flexDirection: "column",
        marginHorizontal: 0,

    },

    table: {
        margin: 10,
        padding: 10,

    },

});

export default TableView