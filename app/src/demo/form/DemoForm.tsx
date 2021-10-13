import * as React from 'react';
import { useForm, useArrayDataSource, useUuiContext, useLazyDataSource, FileUploadResponse, ILens, Lens, useAsyncDataSource } from '@epam/uui';
import { demoData } from '@epam/uui-docs';
import {
    FlexCell, FlexRow, FlexSpacer, LabeledInput, Panel, PickerInput, RichTextView, SuccessNotification, Text,
    TextInput, DatePicker, Tooltip, IconContainer, Switch, Button, IconButton, NumericInput, RangeDatePicker,
    MultiSwitch, DropSpot, FileCard
} from '@epam/promo';
import { PersonDetails, PersonLanguageInfo, PersonTravelVisa } from './types';
import { personDetailsSchema } from './validationShema';
import { defaultData } from './defaultData';
import * as infoIcon from '@epam/assets/icons/common/notification-help-outline-24.svg';
import * as addIcon from '@epam/assets/icons/common/action-add-18.svg';
import * as clearIcon from '@epam/assets/icons/common/navigation-close-24.svg';
import * as css from './DemoForm.scss';

const tShirtSizes = [
    { id: 1, caption: 'XS' },
    { id: 2, caption: 'S' },
    { id: 3, caption: 'M' },
    { id: 4, caption: 'L' },
    { id: 5, caption: 'XL' },
];

const removeLensItemHandler = (lens: ILens<any>, index: number) => {
    return lens.set(lens.get().filter((item: any, i: number) => index !== i));
};

const addLensItemHandler = (lens: ILens<any>, item: any) => {
    return lens.set(lens.get().concat(item));
};

const PersonalInfo = ({ lens }: { lens: ILens<PersonDetails['personalInfo']> }) => (
    <>
        <RichTextView><h2 className={ css.sectionTitle }>Personal Info</h2></RichTextView>

        <FlexRow vPadding='12'>
            <FlexCell minWidth={ 324 }>
                <LabeledInput htmlFor="fullName" label='Full Name' { ...lens.prop('fullName').toProps() }>
                    <TextInput { ...lens.prop('fullName').toProps() } id="fullName" placeholder='Ivan Petrov' />
                </LabeledInput>
            </FlexCell>
        </FlexRow>
        <FlexRow vPadding='12'>
            <FlexCell width='auto'>
                <LabeledInput htmlFor="birthDate" label='Date of Birth' { ...lens.prop('birthdayDate').toProps() }>
                    <DatePicker id="birthDate" format='DD/MM/YYYY' { ...lens.prop('birthdayDate').toProps() } />
                </LabeledInput>
            </FlexCell>
        </FlexRow>
    </>
);

const Location = ({ lens }: { lens: ILens<PersonDetails['location']> }) => {
    const svc = useUuiContext();

    const countriesDataSource = useAsyncDataSource({
        api: () => svc.api.demo.countries({ sorting: [{ field: 'name' }] }).then((r: any) => r.items),
    }, []);

    const citiesDataSource = useLazyDataSource({
        api: svc.api.demo.cities
    }, []);

    return (
        <>
            <RichTextView><h3>Location</h3></RichTextView>

            <FlexRow vPadding='12' spacing='18' alignItems='top'>
                <LabeledInput htmlFor="country" label='Country' { ...lens.prop('country').toProps() }>
                    <PickerInput
                        { ...lens.prop('country').toProps() }
                        dataSource={ countriesDataSource }
                        selectionMode='single'
                        valueType='id'
                        inputId="country"
                        placeholder='Select Country'
                        onValueChange={ value => lens.set({ country: value as string, city: null }) }
                    />
                </LabeledInput>
                <LabeledInput htmlFor="city" label='City' { ...lens.prop('city').toProps() }>
                    <PickerInput
                        { ...lens.prop('city').toProps() }
                        selectionMode='single'
                        valueType='id'
                        inputId="city"
                        dataSource={ citiesDataSource }
                        filter={ { country: lens.prop('country').get() } }
                        placeholder='Select City'
                    />
                </LabeledInput>
            </FlexRow>
        </>
    )
};

const PrimaryInfo = ({ lens }: { lens: ILens<PersonDetails['primaryInfo']> }) =>  (
    <>
        <FlexRow>
            <RichTextView><h3>Primary Info</h3></RichTextView>
            <Tooltip trigger='hover' offset={ [0, 3] } content='You have no permission to edit this information'>
                <IconContainer icon={ infoIcon } cx={ css.infoIcon } />
            </Tooltip>
        </FlexRow>

        <FlexRow vPadding='12' spacing='18' alignItems='top'>
            <LabeledInput htmlFor="status" label='Status' { ...lens.prop('status').toProps() }>
                <TextInput
                    { ...lens.prop('status').toProps() }
                    placeholder='Select Status'
                    id="status"
                />
            </LabeledInput>
            <LabeledInput htmlFor="productionCategory" label='Production Category' { ...lens.prop('productionCategory').toProps() }>
                <TextInput
                    { ...lens.prop('productionCategory').toProps() }
                    placeholder='Select Category'
                    id="productionCategory"
                />
            </LabeledInput>
        </FlexRow>
        <FlexRow vPadding='12' spacing='18' alignItems='top'>
            <FlexCell minWidth={ 324 }>
                <LabeledInput htmlFor="organizationalCategory" label='Organizational category' { ...lens.prop('organizationalCategory').toProps() }>
                    <TextInput
                        { ...lens.prop('organizationalCategory').toProps() }
                        placeholder='Select Organizational Category'
                        id="organizationalCategory"
                    />
                </LabeledInput>
            </FlexCell>
            <FlexRow spacing='18'>
                <FlexCell minWidth={ 186 }>
                    <LabeledInput htmlFor="jobFunction" label='Job Function' { ...lens.prop('jobFunction').toProps() }>
                        <TextInput
                            { ...lens.prop('jobFunction').toProps() }
                            placeholder='Select Job Function'
                            id="jobFunction"
                        />
                    </LabeledInput>
                </FlexCell>
                <FlexCell minWidth={ 120 }>
                    <LabeledInput htmlFor="jobFunctionLevel" label='Job Function Level' { ...lens.prop('jobFunctionLevel').toProps() }>
                        <TextInput
                            { ...lens.prop('jobFunctionLevel').toProps() }
                            placeholder='Select Level'
                            id="jobFunctionLevel"
                        />
                    </LabeledInput>
                </FlexCell>
            </FlexRow>
        </FlexRow>
        <FlexRow vPadding='12' spacing='18' alignItems='top'>
            <FlexCell minWidth={ 324 }>
                <FlexRow spacing='18'>
                    <FlexCell minWidth={ 120 }>
                        <LabeledInput htmlFor="currentProject" label='Current Project' { ...lens.prop('currentProject').toProps() }>
                            <TextInput
                                { ...lens.prop('currentProject').toProps() }
                                placeholder='Select Project'
                                id="currentProject"
                            />
                        </LabeledInput>
                    </FlexCell>
                    <FlexCell minWidth={ 186 }>
                        <LabeledInput htmlFor="projectRole" label='Role' { ...lens.prop('projectRole').toProps() }>
                            <TextInput
                                { ...lens.prop('projectRole').toProps() }
                                placeholder='Select Role'
                                id="projectRole"
                            />
                        </LabeledInput>
                    </FlexCell>
                </FlexRow>
            </FlexCell>
            <FlexRow size='48' spacing='18' alignItems='bottom'>
                <Switch label='Time Reporting' { ...lens.prop('timeReporting').toProps() } isDisabled />
                <Switch label='Remote' { ...lens.prop('remoteStatus').toProps() } isDisabled />
            </FlexRow>
        </FlexRow>
    </>
);

const Education = ({ lens }: { lens: ILens<PersonDetails['education']> }) => {
    const institutionLevelsDataSource = useArrayDataSource({
        items: demoData.universities,
    }, []);

    return (
        <>
            <RichTextView><h3>Education</h3></RichTextView>

            <FlexRow vPadding='12'>
                <FlexCell minWidth={ 324 }>
                    <LabeledInput htmlFor="institution" label='Institution' { ...lens.prop('institution').toProps() }>
                        <PickerInput
                            { ...lens.prop('institution').toProps() }
                            dataSource={ institutionLevelsDataSource }
                            selectionMode='single'
                            inputId="institution"
                            getName={ item => item.university.split(' / ')[0] }
                            sorting={ { field: 'university', direction: 'asc' } }
                            valueType='id'
                            placeholder='Select Institution'
                        />
                    </LabeledInput>
                </FlexCell>
            </FlexRow>
            <FlexRow vPadding='12' spacing='18' alignItems='top'>
                <LabeledInput htmlFor="faculty" label='Faculty' { ...lens.prop('faculty').toProps() }>
                    <TextInput
                        { ...lens.prop('faculty').toProps() }
                        placeholder='Faculty Name'
                        id="faculty"
                    />
                </LabeledInput>
                <LabeledInput htmlFor="department" label='Department' { ...lens.prop('department').toProps() }>
                    <TextInput
                        { ...lens.prop('department').toProps() }
                        placeholder='Department Name'
                        id="department"
                    />
                </LabeledInput>
            </FlexRow>
            <FlexRow vPadding='12' spacing='18' alignItems='top'>
                <LabeledInput htmlFor="degree" label='Degree' { ...lens.prop('degree').toProps() }>
                    <TextInput
                        { ...lens.prop('degree').toProps() }
                        placeholder='Degree Name'
                        id="degree"
                    />
                </LabeledInput>
                <LabeledInput htmlFor="speciality" label='Speciality' { ...lens.prop('speciality').toProps() }>
                    <TextInput
                        { ...lens.prop('speciality').toProps() }
                        placeholder='Speciality Name'
                        id="speciality"
                    />
                </LabeledInput>
            </FlexRow>
            <FlexRow vPadding='12' spacing='18'>
                <FlexCell minWidth={ 120 } >
                    <LabeledInput htmlFor="graduationYear" label='Graduation year' { ...lens.prop('graduationYear').toProps() }>
                        <NumericInput
                            { ...lens.prop('graduationYear').toProps() }
                            min={ 1950 }
                            max={ 2020 }
                            placeholder='2020'
                            id="graduationYear"
                        />
                    </LabeledInput>
                </FlexCell>
            </FlexRow>
        </>
    );
};

const Languages = ({ lens }: { lens: ILens<PersonDetails> }) => {
    const svc = useUuiContext();
    const emptyLangInfo: PersonLanguageInfo = { language: null, writingLevel: null, speakingLevel: null };
    const langLens = lens.prop('languageInfo').default([emptyLangInfo]);

    const languageDataSource = useAsyncDataSource({
        api: () => svc.api.demo.languages({}).then((r: any) => r.items),
    }, []);

    const languageLevelsDataSource = useArrayDataSource({
        items: demoData.languageLevels,
    }, []);

    return (
        <>
            <RichTextView><h3>Languages</h3></RichTextView>
            { langLens.get().map((value, index) => {
                let langLensItem = langLens.index(index);
                let isClearable = index !== 0 || value.language || value.speakingLevel || value.writingLevel;

                return (
                    <FlexRow key={ index } vPadding='12' spacing='18' alignItems='top'>
                        <FlexCell minWidth={ 186 }>
                            <LabeledInput htmlFor={`language-${index}`} label='Language' { ...langLensItem.prop('language').toProps() } >
                                <PickerInput
                                    { ...langLensItem.prop('language').toProps() }
                                    dataSource={ languageDataSource }
                                    selectionMode='single'
                                    valueType='id'
                                    inputId={`language-${index}`}
                                    placeholder='Select Language'
                                />
                            </LabeledInput>
                        </FlexCell>
                        <FlexCell minWidth={ 120 }>
                            <LabeledInput htmlFor={`speakingLevel-${index}`} label='Speaking' { ...langLensItem.prop('speakingLevel').toProps() } >
                                <PickerInput
                                    { ...langLensItem.prop('speakingLevel').toProps() }
                                    dataSource={ languageLevelsDataSource }
                                    selectionMode='single'
                                    valueType='id'
                                    inputId={`speakingLevel-${index}`}
                                    placeholder='Select Level'
                                    getName={ item => item.level }
                                />
                            </LabeledInput>
                        </FlexCell>
                        <FlexCell minWidth={ 120 }>
                            <LabeledInput htmlFor={`writingLevel-${index}`} label='Writing' { ...langLensItem.prop('writingLevel').toProps() } >
                                <PickerInput
                                    { ...langLensItem.prop('writingLevel').toProps() }
                                    dataSource={ languageLevelsDataSource }
                                    selectionMode='single'
                                    valueType='id'
                                    inputId={`writingLevel-${index}`}
                                    placeholder='Select Level'
                                    getName={ item => item.level }
                                />
                            </LabeledInput>
                        </FlexCell>
                        <FlexRow size='48' alignItems='bottom' cx={ css.clearButtonWrapper }>
                            { isClearable && <IconButton icon={ clearIcon } onClick={ () => removeLensItemHandler(langLens, index) }/> }
                        </FlexRow>
                    </FlexRow>
                );
            })
            }
            <FlexRow vPadding='12'>
                <Button
                    onClick={ () => addLensItemHandler(langLens, emptyLangInfo) }
                    caption='Add One More'
                    icon={ addIcon }
                    fill='none'
                />
            </FlexRow>
        </>
    );
};

const Visas = ({ lens }: { lens: ILens<PersonDetails> }) => {
    const svc = useUuiContext();
    const emptyVisa: PersonTravelVisa = { country: null, term: null };
    const visasLens = lens.prop('travelVisas').prop('visas').default([emptyVisa]);
    const scansLens = Lens.onEditable(lens.prop('travelVisas').prop('scans').toProps()).default([]);

    const countriesDataSource = useAsyncDataSource({
        api: () => svc.api.demo.countries({ sorting: [{ field: 'name' }] }).then((r: any) => r.items),
    }, []);

    const uploadFile = (files: File[], lens: ILens<({progress?: number} & Partial<FileUploadResponse>)[]>) => {
        let tempIdCounter = 0;
        const attachments = lens.default([]).get();

        const updateAttachment = (newFile: any, id: number) => {
            lens.set(attachments.map(i => i.id === id ? newFile : i));
        };

        const trackProgress = (progress: number, id: number) => {
            const file = attachments.find(i => i.id === id);
            file.progress = progress;
            updateAttachment(file, file.id);
        };

        files.map(file => {
            const tempId = --tempIdCounter;
            const fileToAttach = {
                id: tempId,
                name: file.name,
                size: file.size,
                progress: 0,
            };

            attachments.push(fileToAttach);
            svc.uuiApi.uploadFile('/uploadFileMock', file, { onProgress: (progress) => trackProgress(progress, tempId) }).then(res => {
                updateAttachment({ ...res, progress: 100 }, tempId);
            });
        });

        lens.set(attachments);
    };

    return (
        <>
            <RichTextView><h3>Travel Visas</h3></RichTextView>

            { visasLens.get().map((value, index) => {
                const isClearable = index !== 0 || value.country || value.term;
                return (
                    <FlexRow key={ index } vPadding='12' spacing='18' alignItems='top' >
                        <FlexCell minWidth={ 324 }>
                            <LabeledInput htmlFor={`travelVisasCountry-${index}`} label='Country' { ...visasLens.index(index).prop('country').toProps() } >
                                <PickerInput
                                    { ...visasLens.index(index).prop('country').toProps() }
                                    dataSource={ countriesDataSource }
                                    selectionMode='single'
                                    valueType='id'
                                    inputId={`travelVisasCountry-${index}`}
                                    placeholder='Select Country'
                                />
                            </LabeledInput>
                        </FlexCell>
                        <FlexCell minWidth={ 294 }>
                            <LabeledInput label='Term' { ...visasLens.index(index).prop('term').toProps() } >
                                <RangeDatePicker { ...visasLens.index(index).prop('term').toProps() } />
                            </LabeledInput>
                        </FlexCell>
                        <FlexRow size='48' alignItems='bottom' cx={ css.clearButtonWrapper }>
                            { isClearable && <IconButton icon={ clearIcon } onClick={ () => removeLensItemHandler(visasLens, index) }/> }
                        </FlexRow>
                    </FlexRow>
                );
            }) }
            <FlexRow vPadding='12'>
                <Button onClick={ () => addLensItemHandler(visasLens, emptyVisa) }  caption='Add One More' icon={ addIcon } fill='none' />
            </FlexRow>
            <FlexRow vPadding='12' spacing='18' >
                <FlexCell width='100%'>
                    <LabeledInput label='Scans' >
                        <DropSpot
                            infoText='Up to 20 files. Limit for 1 file is 5 MB'
                            onUploadFiles={ files => uploadFile(files, scansLens) }
                        />
                        <div className={ scansLens.get().length && css.attachmentContainer } >
                            {scansLens.get().map((i, index) => (
                                <FileCard
                                    key={ index }
                                    file={ i }
                                    onClick={ () => removeLensItemHandler(scansLens, index) }
                                />
                            ))}
                        </div>
                    </LabeledInput>
                </FlexCell>
            </FlexRow>
        </>
    );
};

const OtherInfo = ({ lens }: { lens: ILens<PersonDetails['otherInfo']> }) => (
    <>
        <RichTextView><h3>Other Info</h3></RichTextView>

        <FlexRow vPadding='12'>
            <FlexCell width='auto'>
                <LabeledInput label='T-Shirt Size' { ...lens.prop('tShirtSize').toProps() } >
                    <MultiSwitch
                        items={ tShirtSizes }
                        { ...lens.prop('tShirtSize').toProps() }
                    />
                </LabeledInput>
            </FlexCell>
        </FlexRow>
    </>
);

export function DemoForm() {
    const svc = useUuiContext();

    const { lens, validate, save } = useForm<PersonDetails>({
        value: defaultData,
        getMetadata: personDetailsSchema,
        onSave: person => Promise.resolve({ form: person }),
        onSuccess: () => svc.uuiNotifications.show(props =>
            <SuccessNotification { ...props }>
                <Text size='36' font='sans' fontSize='14'>Data has been saved!</Text>
            </SuccessNotification>, { duration: 2 }),
    });

    return (
        <div className={ css.root }>
            <FlexRow size='48'>
                <RichTextView><h1>My Profile</h1></RichTextView>
                <FlexSpacer />
            </FlexRow>
            <Panel cx={ css.formPanel } background='white' shadow>
                <FlexCell width='100%'>
                    <PersonalInfo lens={ lens.prop('personalInfo') } />
                    <Location lens={ lens.prop('location') } />
                    <PrimaryInfo lens={ lens.prop('primaryInfo') } />
                    <Education lens={ lens.prop('education') } />
                    <Languages lens={ lens } />
                    <Visas lens={ lens } />
                    <OtherInfo lens={ lens.prop('otherInfo') } />
                    <hr className={ css.divider } />
                    <FlexRow spacing='12'>
                        <FlexSpacer />
                        <Button caption='Validate' color='blue' onClick={ validate } />
                        <Button caption='Save' color='green' onClick={ save } />
                    </FlexRow>
                </FlexCell>
            </Panel>
        </div>
    );
}