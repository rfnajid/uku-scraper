import { Injectable } from "@angular/core";
import { app } from "electron";
import { ElectronService} from '../../electron/electron.service';

import * as fs from 'fs';
import { relative } from "path";

@Injectable({
    providedIn: 'root'
})

export class FileService {

    fs: typeof fs;
    app: typeof app;
    public defaultPath: string;

    constructor(electronService: ElectronService){
        this.fs = electronService.fs;
        this.app = electronService.app;
        this.defaultPath = this.app.getPath('downloads');
    }

    public mkdir(relativePath: string){
        const path = this.getFullPath(relativePath);

        if(this.fs.existsSync(path)){
            return;
        };

        this.fs.mkdirSync(path);
    }

    public writeFile(relativePath: string, file: string){
        const path = this.getFullPath(relativePath);
        this.fs.writeFileSync(path, file);
    }

    private getFullPath(relativePath: string): string{
        return this.defaultPath + '/' + relativePath;
    }

}