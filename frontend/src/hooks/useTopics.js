import React from "react";
import { useWatch } from "./useWatch";
import { useCollection } from "./useCollection";
import { useRealmApp } from "../components/RealmApp";
import { dataSourceName } from "../realm.json";
import { BSON } from "realm-web";


export function useTopics() {
    // Set up a list of topics in state
    const realmApp = useRealmApp();
    const [topics, setTopics] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // Get a client object for the todo task collection
    const moduleCollection = useCollection({
        cluster: dataSourceName,
        db: "studybuddy",
        collection: "Topic",
    });

    // Fetch all topics on load and whenever our collection changes (e.g. if the current user changes)
    React.useEffect(() => {
        moduleCollection.find({}).then((fetchedTopics) => {
            setTopics(fetchedTopics);
            setLoading(false);
        });
    }, [moduleCollection]);

    /**
     * Return a module by id
     * @param {BSON.ObjectId | string} id The object id of the module 
     * @returns A Module if found, else undefined
     */
    const getModule = (id) => {
        return topics.find(m => String(m._id) === String(id));
    }

    return {
        loading,
        topics,
        getModule
    };

}