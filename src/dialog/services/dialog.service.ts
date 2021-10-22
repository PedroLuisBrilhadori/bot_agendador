import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhookClient } from 'dialogflow-fulfillment';

@Injectable()
export class DialogService {
    constructor (

    ) {}
    
    redirectFunction(req: Request, res: Response): void {
        const agent = new WebhookClient({
            request: req,
            response: res
        })

        var intent = new Map();

        intent.set("1) Informe os dados", this.oi);
        
        agent.handleRequest(intent);
    }

    private oi(agent: any): any {
        agent.add('oi');
    }
}