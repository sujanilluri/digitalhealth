import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionnaireService } from '../../services/questionnaire.service';

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.component.html',
  styleUrls: ['./questionnaire.component.css']
})
export class QuestionnaireComponent implements OnInit {
  questionnaireForm: FormGroup;
  questionnaireData: any;

  constructor(private fb: FormBuilder, private questionnaireService: QuestionnaireService) {
    this.questionnaireForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.questionnaireService.getQuestionnaire().subscribe(data => {
      this.questionnaireData = data;
      this.createForm();
    });
  }

  createForm() {
    this.questionnaireData.item.forEach((question: any) => {
      const controlName = `question_${question.linkId}`;
      switch (question.type) {
        case 'boolean':
          this.questionnaireForm.addControl(controlName, this.fb.control(null, Validators.required));
          break;
        case 'choice':
          this.questionnaireForm.addControl(controlName, this.fb.control(null, Validators.required));
          break;
        case 'date':
          this.questionnaireForm.addControl(controlName, this.fb.control(null, Validators.required));
          break;
        case 'string':
          this.questionnaireForm.addControl(controlName, this.fb.control('', Validators.required));
          break;
      }
    });
  }

  onSubmit() {
    console.log(this.questionnaireForm.value);
  }
}
