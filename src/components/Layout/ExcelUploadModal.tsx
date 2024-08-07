import { Alert, Button, FileInput, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconFileSpreadsheet } from "@tabler/icons-react";
import { yupResolver } from "mantine-form-yup-resolver";
import { FC, useState } from "react";
import * as yup from "yup";
import { useAxios } from "../../hooks/useAxios";
import { useToast } from "../../hooks/useToast";
import { isAxiosError } from "axios";
import { AxiosErrorResponseType, AxiosSuccessResponseType } from "../../utils/types";
import { useExcelExport } from "../../hooks/useExcelExport";
import { api_routes } from "../../utils/api_routes";

type ExcelUploadModalProps = {
    status: boolean;
    toggleModal: () => void;
    title: string;
    uploadUrl: string;
    sampleExcel: string;

}
const schema = yup
  .object({
    file: yup.mixed()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .test('fileFormat', 'Please select a valid excel file', (value:any) => ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'].includes(value.type)).required("Please select an excel file"),
  })
  .required();

const ExcelUploadModal:FC<ExcelUploadModalProps> = ({status, toggleModal, title, uploadUrl, sampleExcel}) => {

    const { axios } = useAxios();
    const { exportExcel, excelLoading } = useExcelExport();
    const { exportExcel: exportSampleExcel, excelLoading: sampleExcelLoading } = useExcelExport();
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<{successCount: number, errorCount: number, fileName: string | null} | null>(null);
    const {toastSuccess, toastError} = useToast();
    const form = useForm({
        validate: yupResolver(schema),
    });

    const onSubmitHandler = async () => {
        setLoading(true);
        setResult(null);
        try {
            const fileData = form.values.file as File;
            const formData = new FormData();
            formData.append('file', fileData as File, fileData.name);
            const resp = await axios.post<AxiosSuccessResponseType<{successCount: number, errorCount: number, fileName: string | null}>>(uploadUrl, formData);
            setResult(resp.data.data || null);
            form.reset();
            toastSuccess(title+' excel uploaded successfully. Please refresh the page to see the changes.');
        }catch(error){
            console.log(error);
            if(isAxiosError<AxiosErrorResponseType>(error)){
                if(error.response?.data.formErrors){
                    form.setFieldError("file", error.response?.data.formErrors.file[0]);
                }else if(error.response?.data.message){
                    toastError(error.response.data.message);
                }
            }else{
                toastError('Something went wrong. Please try again later.');
            }
        }finally{
            setLoading(false);
        }
    }

    const downloadFailedExcel = async () => {
        if(result?.fileName){
            await exportExcel(`${api_routes.upload.failed_excel}/${result?.fileName}`, result?.fileName);
            if(!excelLoading){
                form.reset();
                setResult(null);
                toggleModal();
            }
        }
    }

    const downloadSampleExcel = async () => {
        await exportSampleExcel(`${api_routes.upload.sample_excel}/${sampleExcel}`, sampleExcel);
    }

    return (
        <Modal opened={status} onClose={()=>{form.reset(); setResult(null); toggleModal();}} centered size="sm" withCloseButton={true}  title={'Import '+ title} overlayProps={{
            backgroundOpacity: 0.55,
            blur: 3,
        }}>
            {result && <Alert variant="light" color="main" onClose={() => setResult(null)} title={<Text size="md" style={{fontWeight: 'bold'}}>Import {title} Result</Text>} mb={10}>
                {result.successCount>0 && <Text size="sm">Successfully Imported: <b style={{color: 'green'}}>{result.successCount}</b></Text>}
                {result.errorCount>0 && <Text size="sm">Failed To Import: <b style={{color: 'red'}}>{result.errorCount}</b> {result.fileName && <div style={{textAlign: 'right'}}><Button variant="filled" size="xs" color="red" mt={10} px={5} loading={excelLoading} disabled={excelLoading} onClick={downloadFailedExcel} p={0} m={0}>Download Failed Excel</Button></div>}</Text>}
            </Alert>}
            <form onSubmit={form.onSubmit(onSubmitHandler)}>
                <FileInput
                    label={<Text size="sm">Select Excel File (<Button type="button" variant="transparent" size="sm" px={0} loading={sampleExcelLoading} onClick={downloadSampleExcel}>Download Sample Excel</Button>)</Text>}
                    placeholder="Excel file"
                    clearable
                    accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    leftSection={<IconFileSpreadsheet size={16} />}
                    {...form.getInputProps('file')}
                    disabled={loading}
                />
                <Button type='submit' variant="filled" color='main' mt="lg" disabled={loading} loading={loading} aria-disabled={loading}>
                    Upload
                </Button>
            </form>
        </Modal>
    )
}

export default ExcelUploadModal;