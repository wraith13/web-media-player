# How to build

## Prerequisites

- Node.js (version 16 or higher recommended)
- npm (Node Package Manager)

## Steps

1. Install dependencies:
   ```sh
   npm install
   ```
2. Build the project:
   ```sh
   npm run-script "build all"
   ```

# Build commands

```mermaid
graph TB;
    subgraph ./locale
        direction TB;
        subgraph ./locale/generated
            direction TB;
            lmt[[./locale/generated/master.ts]];
            lmls[[./locale/generated/manifest.langs.json]];
            lwma[[./locale/generated/web-manifest-assets.json]];
            lh[[./locale/generated/*.html]];
        end
        ./locale/index.ts;
        ./locale/index.js;
        bls([build locale script]);
        bl([build locale]);
    end
    subgraph ./image
        direction TB;
        ./image/*.svg
    end
    subgraph ./resource
        direction TB;
        subgraph ./resource/lang
            direction TB;
            ./resource/lang/*.json;
        end
        ./resource/*.json;
    end
    subgraph ./style
        direction TB;
        sts[[./style/*.scss]];
        stc[[./style/index.css]];
        bst([build style]);
    end
    subgraph ./script
        direction TB;
        st[[./script/*.ts]];
        sj[[./script/index.js]];
        bs([build script]);
    end
    subgraph ./web.manifest
        direction TB;
        subgraph ./web.manifest/generated
            direction TB;
            wmj[[./web.manifest/generated/*.json]];
        end
        ./web.manifest/template.json;
        bwm([build web.manifest]);
    end
    subgraph category
        direction TB;
        bc([build commands]);
        sf[source files];
        gf[[generated files]];
    end
    ./locale/index.ts-->bls([build locale script]);
    bls([build locale script])-->./locale/index.js;
    ./resource/lang/*.json-->bl([build locale]);
    ./locale/index.js-->bl([build locale]);
    ./resource/*.json-->bs([build script]);
    lmls[[./locale/generated/manifest.langs.json]]-->bwm([build web.manifest])
    ./resource/lang/*.json-->bwm([build web.manifest])
    bl([build locale])-->lmt[[./locale/generated/master.ts]];
    bl([build locale])-->lmls[[./locale/generated/manifest.langs.json]];
    bl([build locale])-->lwma[[./locale/generated/web-manifest-assets.json]];
    bl([build locale])-->lh[[./locale/generated/*.html]];
    sts[[./style/*.scss]]-->bst([build style])-->stc[[./style/index.css]];
    lmt[[./locale/generated/master.ts]]-->bs([build script]);
    st[[./script/*.ts]]-->bs([build script])-->sj[[./script/index.js]];
    ./web.manifest/template.json-->bwm([build web.manifest])
    bwm([build web.manifest])-->wmj[[./web.manifest/generated/*.json]];
    ./resource/*.json-->bh([build html]);
    lh[[./locale/generated/*.html]]-->bh([build html]);
    stc[[./style/index.css]]-->bh([build html]);
    sj[[./script/index.js]]-->bh([build html]);
    ./image/*.svg-->bh([build html]);
    ./index.html.template-->bh([build html]);
    bh([build html])-->ih[[./index.html]];
    ./README.template.md-->bl([build locale]);
    bl([build locale])-->rdm[[./README.md]];
    ./resource/*.json-->bsw([build service-worker]);
    lwma[[./locale/generated/web-manifest-assets.json]]-->bsw([build service-worker]);
    ./sw.js.template-->bsw([build service-worker]);
    bsw([build service-worker])-->sw[[./sw.js]];
```
( You can see this diagram in VS code with [Markdown Preview Mermaid Support extension](https://marketplace.visualstudio.com/items?itemName=bierner.markdown-mermaid). )

- `npm run-script "build all"`
- `npm run-script "build locale script"`
- `npm run-script "build locale"`
- `npm run-script "build web.manifest"`
- `npm run-script "build service-worker"`
- `npm run-script "build style"`
- `npm run-script "build script"`
- `npm run-script "build html"`
