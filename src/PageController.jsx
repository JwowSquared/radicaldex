import { useEffect, useState } from "react";
import { HomePage } from "./HomePage";
import { SpeciesDex } from "./SpeciesDex";
import { MoveDex } from "./MoveDex";
import { AbilityDex } from "./AbilityDex";
import { ItemDex } from "./ItemDex";
import { AreaDex } from "./AreaDex";
import { TrainerDex } from "./TrainerDex";

export function PageController({ database }) {

    const [settings, updateSettings] = useState(() => {
        const localValue = localStorage.getItem("SETTINGS");
        if (localValue == null) return {};
        return JSON.parse(localValue);
      });
    
      useEffect(() => {
        localStorage.setItem("SETTINGS", JSON.stringify(settings))
      }, [settings]);

    let pages = [
        {label: "Home", component: HomePage},
        {label: "Species Dex", component: SpeciesDex},
        {label: "Move Dex", component: MoveDex},
        {label: "Ability Dex", component: AbilityDex},
        {label: "Item Dex", component: ItemDex},
        {label: "Area Dex", component: AreaDex},
        {label: "Trainer Dex", component: TrainerDex},
    ];

    function setPage(page) {
        updateSettings(currentSettings => {
            return {...currentSettings, page: page};
        });
    }

    function displayPage(page) {
        const PageComponent = pages[page].component;
        return ( <PageComponent database={database} settings={settings} updateSettings={updateSettings}/> );
    }

    return (
        <>
            <div>Page Controller</div>
            <div>
                {pages.map((page, i) => {
                 return (
                        <button key={i} onClick={() => setPage(i)}>{page.label}</button>
                )
                })}
            </div>
            {displayPage(settings.page)}
        </>
    );
}